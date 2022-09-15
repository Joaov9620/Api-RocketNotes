const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join(''); //join = juntar todas elas

    sqliteConnection()
    .then(db => db.exec(schemas)) //executar os schemas
    .catch(error => console.error(error));
}

module.exports = migrationsRun;
