const {verify} = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;
  
    if(!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        //verifica se é um token válido, o sub passa a ser chamado de user_id
       const { sub: user_id } = verify(token, authConfig.jwt.secret);
 
       //pega o id do usuario no token e insere na requisição
       request.user = {
        id: Number(user_id)
       };
       return next();
    }catch{
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;