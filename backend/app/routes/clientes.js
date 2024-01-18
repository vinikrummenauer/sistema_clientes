const express = require('express');
const router = express.Router();
const clientesController = require('../controller/clientesController');

router.post('/', clientesController.cadastrarCliente);

router.get('/', clientesController.listarClientes);

router.get('/filtrar', clientesController.listarClientes);

router.get('/rota-otimizada', clientesController.calcularRotaOtimizada);

module.exports = router;
