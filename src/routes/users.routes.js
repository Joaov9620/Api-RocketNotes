//Importando o Router de dentro o express
const {Router, response} = require("express");

//Importando o controle
const UserController = require("../controllers/UsersController");

const usersRoutes = Router();

//instanciando na memória. Reservando um espaço em memoria para a class
const usersController = new UserController();


usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);
   

//exportando para quem quiser utilizar esse arquivo
module.exports = usersRoutes;