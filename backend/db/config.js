const pgp = require('pg-promise')();

const connection = {
  host: 'localhost',
  port: '5432',
  database: 'sistema_clientes',
  user: 'postgres',
  password: 'vini0613'
};

const db = pgp(connection);

module.exports = db;
