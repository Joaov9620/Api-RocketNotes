//Importando o Router de dentro o express
const {Router, response} = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

//Importando o controle
const UserController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

//instanciando na memória. Reservando um espaço em memoria para a class
const usersController = new UserController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);  //quando quer atualizar mais de um capo
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)//quando quer atualizar um campo especifíco
   

//exportando para quem quiser utilizar esse arquivo
module.exports = usersRoutes;