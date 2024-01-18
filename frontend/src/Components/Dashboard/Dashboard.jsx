import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import CriarCliente from '../CriarCliente/CriarCliente';
import { BsCarFront, BsClipboard, BsDoorClosed, BsPlus } from 'react-icons/bs';
import ListarClientes from '../ListarClientes/ListarClientes';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('list');

  const deleteInfo = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return (
          <section>
            <CriarCliente />
            
          </section>
        );
      case 'list':
        return (
          <section>
            <ListarClientes />
          </section>
        )
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
    <nav>
      <ul className="dashboard-nav">
        <h2>
         <BsCarFront className="icon"/>
          Sistema clientes
        </h2>
        <hr />
        <li>
          <BsClipboard className="icon"/>
          <Link to="#" onClick={() => setActiveTab('list')}>Listagem clientes</Link>
        </li>
        <li>
          <BsCarFront className="icon"/>
          <Link to="#" onClick={() => setActiveTab('create')}>Criar usuário</Link>
        </li>
      </ul>
    </nav>

      <div className="dashboard-content">
        <h1>Bem-vindo ao sistema!</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
