import React, { useState } from "react";
import "./CriarCliente.css";
import chamarAPI from "../../Services/chamarAPI";
import Swal from "sweetalert2";

const CriarCliente = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [coordenadaX, setCoordenadaX] = useState("");
  const [coordenadaY, setCoordenadaY] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoCliente = {
      nome,
      email,
      telefone,
      coordenada_x: coordenadaX || Math.random() * 100,
      coordenada_y: coordenadaY || Math.random() * 100,
    };

    try {
      const request = chamarAPI();
      const response = await request.post('/clientes', novoCliente);
      console.log(response)
      if (response.data.resultado) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Cliente criado com sucesso!",
        });

        setNome("");
        setEmail("");
        setTelefone("");
        setCoordenadaX("");
        setCoordenadaY("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro ao criar o cliente!",
        });
      }
    } catch (error) {
      console.error("Erro ao criar o cliente:", error);
    }
  };

  return (
    <div className="criarCliente">
      <h2>Criar Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nomeInput">Nome:</label>
        <input
          type="text"
          id="nomeInput"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="emailInput">Email:</label>
        <input
          type="email"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="telefoneInput">Telefone:</label>
        <input
          type="tel"
          id="telefoneInput"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <label htmlFor="coordenadaXInput">Coordenada X (opcional):</label>
        <input
          type="text"
          id="coordenadaXInput"
          value={coordenadaX}
          onChange={(e) => setCoordenadaX(e.target.value)}
        />

        <label htmlFor="coordenadaYInput">Coordenada Y (opcional):</label>
        <input
          type="text"
          id="coordenadaYInput"
          value={coordenadaY}
          onChange={(e) => setCoordenadaY(e.target.value)}
        />

        <button type="submit">Criar Cliente</button>
      </form>
    </div>
  );
};

export default CriarCliente;
