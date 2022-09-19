const knex = require('../database/knex'); //importando o knex


class NotesController{
    async create(request, response){
        const { title, description, tags, links} = request.body;
        const { user_id } = request.params;

        //iserir a nota e recuperando o id da nota cadastrada 
        const note_id =  await knex("notes").insert({
            title,
            description,
            user_id
        });

        //objeto que está inserindo o código da nota
        const linksInsert = links.map(link =>{  //links.map(link =>) , pecorrer cada item, para cada link que tem retornar
           return{ 
            note_id,
            url: link //mudando de link para url
           }
        });

        //inserir na tabela links o linksInsert
        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name =>{  
            return{ 
             note_id,
             name,
             user_id
            }
        });
        
        await knex("tags").insert(tagsInsert);

        response.json();
    }

    async show(request, response){
        const { id } = request.params;

        const note = await knex("notes").where({id}).first();  //retornar a primeira nota do id
        const tags = await knex("tags").where({note_id: id}).orderBy("name"); //retornar as tags em ordem alfabética
        const links = await knex("links").where({note_id: id}).orderBy("created_at"); //retornar os links pela ordem que foi criado

        return response.json({
            ...note,
            tags,
            links
        });

    }
}

module.exports = NotesController;