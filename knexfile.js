//query build do projeto
const path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
   //funcionalidade que o que colocar aqui vai ser executado no momento de estabelecer conecxão com o banco de dados
    pool:{
       //"PRAGMA foreign_keys = ON = habilitar a funcionalidade de quando eu deletar uma nota ele deletar em cascata
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve( __dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
