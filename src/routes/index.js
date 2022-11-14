//Missão do index é reunir todas as rotas

const {Router} = require("express");    //Importando o Router de dentro o express

const usersRoutes = require("./users.routes")//importamos o user.routes
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

//o routes contem todas as rotas da nossa aplicação
const routes = Router();

//toda vez que alguem acessar o '/users' vai ser redirecionado para userRoutes que é o grupo de rotas do usuário
routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)

routes.use("/sessions", sessionsRouter)

//exportando routes
module.exports = routes;