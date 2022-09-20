//Importando o Router de dentro o express
const {Router} = require("express");

//Importando o controle
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

//instanciando na memória. Reservando um espaço em memoria para a class
const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);


//exportando para quem quiser utilizar esse arquivo
module.exports = tagsRoutes;