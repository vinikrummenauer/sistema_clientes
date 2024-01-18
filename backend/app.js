const express = require('express');
const app = express();
const cors = require('cors');
const clientesRoutes = require('./app/routes/clientes');
const db = require('./db/config');

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use('/clientes', clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
