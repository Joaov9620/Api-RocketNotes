//Importando o Router de dentro o express
const {Router} = require("express");

//Importando o controle
const NotesController = require("../controllers/NotesController");

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const notesRoutes = Router();

//instanciando na memória. Reservando um espaço em memoria para a class
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);


//exportando para quem quiser utilizar esse arquivo
module.exports = notesRoutes;