//importando a biblioteca de erros
require("express-async-errors");

//importando o banco de dados
const migrationsRun = require("./database/sqlite/migrations")

//importando o AppErro
const AppError= require("./utils/AppError");

const express = require('express'); //importamos o express

//importando o arquivo responsavel pelo grupo de rotas, 
const routes = require("./routes") //  /routes =  quando não colocamos o nome do arquivo ele procura o arquivo chamado index

migrationsRun(); //executando o migrations


//inicializando o express para utilizar ele
const app = express();  //inicializamos o express

//qual padrão que vai utilizar quando receber essas informações, no caso Json
app.use(express.json());


//use essas rotas
app.use(routes);

//error
app.use((error, request, response, next) =>{
    
    //caso o erro for do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    //debugar o error caso precise
    console.error(error);

    //error do servidor status 500
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })

});


//em que porta ele vai ficar observando
const PORT = 3333;      //porta em que a api vai ficar esperando requisições e devolvendo essas respostas


//listen =  ficar escutando. PORT = nesta porta. '( ) =>' = e quando iniciar executar essa função
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
