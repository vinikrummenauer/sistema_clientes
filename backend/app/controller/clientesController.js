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

const calcularRota = (clientes) => {
  const rota = [{ id: 0, nome: 'Empresa', posicao: 0 }];
  let clientesRestantes = [...clientes];

  while (clientesRestantes.length > 0) {
    const clienteMaisProximo = encontrarClienteMaisProximo(rota, clientesRestantes);
    rota.push({ id: clienteMaisProximo.id, nome: clienteMaisProximo.nome, posicao: rota.length,  coordenadas: { X: clienteMaisProximo.coordenada_x, Y: clienteMaisProximo.coordenada_y } });
    clientesRestantes = clientesRestantes.filter((c) => c.id !== clienteMaisProximo.id);
  }

  rota.push({ id: 0, nome: 'Empresa', posicao: rota.length });

  return rota;
};

const encontrarClienteMaisProximo = (rota, clientes) => {
  let clienteMaisProximo;
  let menorDistancia = Infinity;

  for (const cliente of clientes) {
    const distanciaAtual = calcularDistanciaEuclidiana(rota[0], cliente);
    if (distanciaAtual < menorDistancia) {
      menorDistancia = distanciaAtual;
      clienteMaisProximo = cliente;
    }
  }

  return clienteMaisProximo;
};


const calcularDistanciaEuclidiana = (ponto1, ponto2) => {
  if (ponto1.id === 0) {
    const deltaX = ponto2.coordenada_x;
    const deltaY = ponto2.coordenada_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  } else if (ponto2.id === 0) {
    const deltaX = ponto1.coordenada_x;
    const deltaY = ponto1.coordenada_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  } else {
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