const knex = require('../database/knex');

class TagsController{
    //responsável por listar todas as tagas cadastrada do usuário
    async index(request, response){
        const  user_id  = request.user.id;

        //buscando tags
        const tags = await knex("tags")
        //user_id = por ter nomes iguais ele entende que >  user_id: user_id
        .where({ user_id })
        
        response.json(tags);
    }

}

module.exports = TagsController;