const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

//resolve os endereço de acordo com o ambiente
const path = require('path');


async function sqliteConnection(){
    
    //abrir uma conexção
    const database = await sqlite.open({
        //onde nosso arquivo vai ficar salvo
        filename: path.resolve(__dirname, "..", "database.db"),

        ///driver de comunicação
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;