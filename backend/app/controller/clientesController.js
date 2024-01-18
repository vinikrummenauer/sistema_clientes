const Cliente = require('../models/clientesModel');
const db = require('../../db/config');

const cadastrarCliente = async (req, res) => {
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

  try {
    const novoCliente = await db.one(
      'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y]
    );

    res.json({ resultado: true, cliente: novoCliente });
  } catch (error) {
    console.error(error);

    res.status(500).json({ resultado: false, error: 'Erro ao cadastrar cliente.' });
  }
};

const listarClientes = async (req, res) => {
  const { campo, valor } = req.query;

  try {
    let query = 'SELECT * FROM clientes';

    if (campo && valor) {
      query += ` WHERE ${campo} ILIKE $1`;
    }

    const listaClientes = await db.any(query, [`%${valor}%`]);

    res.json(listaClientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar clientes.' });
  }
};

const calcularRotaOtimizada = async (req, res) => {
  try {
    const clientes = await db.any('SELECT * FROM clientes');
    const rotaOtimizada = calcularRota(clientes);
    res.json(rotaOtimizada);
  } catch (error) {
    console.error('Erro ao calcular rota otimizada:', error);
    res.status(500).json({ error: 'Erro ao calcular rota otimizada.' });
  }
};

// função para calcular a rota otimizada com base nas coordenadas dos clientes
const calcularRota = (clientes) => {
  // inicializa a rota com a "Empresa" no ponto (0,0)
  const rota = [{ id: 0, nome: 'Empresa', posicao: 0 }];
  // cria uma cópia da lista de clientes para manipulação
  let clientesRestantes = [...clientes];

  // loop enquanto ainda houver clientes a serem visitados
  while (clientesRestantes.length > 0) {
    // encontra o cliente mais próximo em relação ao último ponto da rota
    const clienteMaisProximo = encontrarClienteMaisProximo(rota, clientesRestantes);

    // adiciona o cliente mais próximo à rota
    rota.push({
      id: clienteMaisProximo.id,
      nome: clienteMaisProximo.nome,
      posicao: rota.length,
      coordenadas: { X: clienteMaisProximo.coordenada_x, Y: clienteMaisProximo.coordenada_y }
    });

    // remove o cliente da lista de clientes restantes
    clientesRestantes = clientesRestantes.filter((c) => c.id !== clienteMaisProximo.id);
  }

  // adiciona a "Empresa" novamente no final da rota
  rota.push({ id: 0, nome: 'Empresa', posicao: rota.length });

  return rota; // retorna a rota otimizada
};

// função para encontrar o cliente mais próximo em relação ao último ponto da rota
const encontrarClienteMaisProximo = (rota, clientes) => {
  let clienteMaisProximo;
  let menorDistancia = Infinity;

  // loop pelos clientes restantes
  for (const cliente of clientes) {
    // calcula a distância euclidiana entre o último ponto da rota e o cliente atual
    const distanciaAtual = calcularDistanciaEuclidiana(rota[0], cliente);

    // atualiza o cliente mais próximo se a distância atual for menor
    if (distanciaAtual < menorDistancia) {
      menorDistancia = distanciaAtual;
      clienteMaisProximo = cliente;
    }
  }

  return clienteMaisProximo; // vai retornar o cliente mais próximo
};

// função para calcular a distância euclidiana entre dois pontos no plano bidimensional
const calcularDistanciaEuclidiana = (ponto1, ponto2) => {
  // verifica se o ponto1 é a "Empresa"
  if (ponto1.id === 0) {
    // calcula a distância usando as coordenadas do ponto2
    const deltaX = ponto2.coordenada_x;
    const deltaY = ponto2.coordenada_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  } else if (ponto2.id === 0) {
    // calcula a distância usando as coordenadas do ponto1
    const deltaX = ponto1.coordenada_x;
    const deltaY = ponto1.coordenada_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  } else {
    // ambos são clientes, calcula a distância normalmente
    const deltaX = ponto2.coordenada_x - ponto1.coordenada_x;
    const deltaY = ponto2.coordenada_y - ponto1.coordenada_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }
};



module.exports = {
  cadastrarCliente,
  listarClientes,
  calcularRotaOtimizada,
};