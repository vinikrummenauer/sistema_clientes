import React, { useEffect, useState } from "react";
import "./ListarClientes.css";
import chamarAPI from "../../Services/chamarAPI";
import {
  BsArrowRightShort,
  BsArrowLeftShort,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";
import Modal from "react-modal";

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCampo, setSelectedCampo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const requestAPI = async () => {
    const response = chamarAPI();

    try {
      const res = await response.get("/clientes");
      console.log(res.data)
      setClientes(res.data);
    } catch (err) {
      setError("Erro ao carregar os dados. Token expirado ou inválido.");
      setTimeout(() => {
        setError("");
      }, 10000);
      console.log("Erro:", err);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
    requestAPI();
  }, []);

  const handleFilterChange = async (campo) => {
    setSelectedCampo(campo);
    Swal.fire({
      title: `Informe o valor para ${campo}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Filtrar',
      cancelButtonText: 'Cancelar',
      preConfirm: async (valor) => {
        if (!valor) {
          Swal.showValidationMessage(`Informe um valor para ${campo}`);
        }
        try {
          const response = chamarAPI();
          const res = await response.get(`/clientes/filtrar?campo=${campo}&valor=${valor}`);
          console.log(res)
          setClientes(res.data);
        } catch (error) {
          console.error('Erro ao filtrar clientes:', error);
          setError('Erro ao filtrar clientes');
        }
      },
    });
  };

  const handleCalcularRota = async () => {
    try {
      const response = chamarAPI();
      const res = await response.get("/clientes/rota-otimizada");
      console.log(res.data)
      const mensagemHtml = `
        <ul>
          ${res.data
            .map(
              (cliente) => `<li>Cliente ${cliente.nome} - Posição ${cliente.posicao + 1}</li>`
            )
            .join("")}
        </ul>`;

      Swal.fire({
        title: "Ordem de Visitação Otimizada",
        html: mensagemHtml,
        confirmButtonText: "Fechar",
      });
    } catch (error) {
      console.error("Erro ao calcular rota otimizada:", error);
      setError("Erro ao calcular rota otimizada");
    }
  };
  

  const formatCoordenadas = (x, y) => {
    return `(${x}, ${y})`;
  };

  return (
    <div className="clientes section">
      <div className="secContainer container">
        <div data-aos="fade-up" className="secHeading flex">
          <h3 className="secTitle">Clientes para edição</h3>
          <div className="navBtns flex">
            <BsArrowLeftShort className="icon leftIcon" />
            <BsArrowRightShort className="icon rightIcon" />
          </div>
        </div>
        <div className="filterContainer">
            <select
              id="campoSelect"
              onChange={(e) => handleFilterChange(e.target.value)}
              value={selectedCampo || ""}
            >
              <option value="" disabled>Filtrar</option>
              <option value="nome">Nome</option>
              <option value="email">Email</option>
              <option value="telefone">Telefone</option>
            </select>
          </div>

        <div className="clienteContainer grid">
          {clientes.map((cliente) => (
            <div
              className="singleCliente grid singleClienteActive"
              data-aos="fade-up"
              key={cliente.id}
            >
              <div className="clienteInfo flex">
                <h5 className="clienteTitle">{cliente.nome}</h5>
              </div>
              <div className="clienteInfo flex">
                <span className="clienteData">{cliente.email}</span>
              </div>
              <div className="clienteInfo flex">
                <span className="clienteData">{cliente.telefone}</span>
              </div>
              <div className="clienteInfo flex">
                <span className="clienteData">{formatCoordenadas(cliente.coordenada_x, cliente.coordenada_y)}</span>
              </div>
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
        </div>
        <button className="btn" 
        onClick={handleCalcularRota}>
          Calcular rota otimizada
        </button>
      </div>
    </div>
  );
};

export default ListarClientes;
