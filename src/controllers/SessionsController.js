const knex  = require('../database/knex');
const AppError = require('../utils/AppError');
const {compare} = require('bcryptjs');
const authConfig = require('../configs/auth');
const {sign} = require('jsonwebtoken');

//rota de autenticação
class SessionsController {

    async create(request, response){
        const {email, password} = request.body;
        
        const user = await knex("users").where({email}).first();

        //verificar se usuário existe
        if(!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const passwordMatched = await compare(password, user.password);

        //se a senha informada é correta
        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const {secret, expiresIn} = authConfig.jwt;
        const token = sign({}, secret,{
            //conteudo que quer inserir no token
            subject: String(user.id),
            expiresIn
        })
    

        return response.json({user, token});
    }
}

module.exports = SessionsController;