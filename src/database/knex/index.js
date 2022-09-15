const config = require("../../../knexfile"); //pegando o as configurações do knexfile

const knex = require("knex"); //importando o knex

const connection = knex(config.development); //criando a conexão

module.exports = connection;

