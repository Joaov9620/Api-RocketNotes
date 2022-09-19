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

    //mostrando as notas pelo id
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

    async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({id}).delete();

        return response.json();
    }

    //mostrar as notas
    async index(request, response){
        const{title, user_id, tags} = request.query;

        let notes;

        if(tags){
            //tags.split(',') = converte esse texto em array utilizando como a delimitador a virgula
            //map(tag =>tag.trim()) =pegar só a tag 
            //O método trim() remove os espaços em branco (whitespaces) do início e/ou fim de um texto
            const filterTags = tags.split(',').map(tag =>tag.trim()); 
             
          
            notes = await knex("tags").select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("note.user_id","=", user_id)
            .whereIn("name", filterTags)   //analisa baseado na tag e passa o vetor que quer que compare se a tag existe
        }else{
            notes = await knex("notes").where({user_id}).whereLike("title" , `%${title}%`).orderBy("title");
        }

        return response.json(notes);
    }
    //rever a aula Aplicando Inner Join pois não entendi foi nada
}

module.exports = NotesController;