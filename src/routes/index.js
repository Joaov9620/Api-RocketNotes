//Missão do index é reunir todas as rotas

//Importando o Router de dentro o express
const {Router} = require("express");

//importamos o user.routes
const usersRoutes = require("./users.routes")

//o routes contem todas as rotas da nossa aplicação
const routes = Router();

//toda vez que alguem acessar o '/users' vai ser redicionado para userRoutes que é o grupo de rotas do usuário
routes.use("/users", usersRoutes)


//exportando routes
module.exports = routes;