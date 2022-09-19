//Importando o Router de dentro o express
const {Router} = require("express");

//Importando o controle
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

//instanciando na memória. Reservando um espaço em memoria para a class
const notesController = new NotesController();


notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);


//exportando para quem quiser utilizar esse arquivo
module.exports = notesRoutes;