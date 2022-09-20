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

    //mostrar as notas    REVER ESSE CÓDIO TODO PARA ENTENDER MELHOR
    async index(request, response){
        const{title, user_id, tags} = request.query;

        let notes;

        if(tags){
            //tags.split(',') = converte esse texto em array utilizando como a delimitador a virgula
            //map(tag =>tag.trim()) =pegar só a tag 
            //O método trim() remove os espaços em branco (whitespaces) do início e/ou fim de um texto
            const filterTags = tags.split(',').map(tag => tag.trim()); 
             
            //conectando a tabela de tags e notas
            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id) //filtrar baseado no id do usuário
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)   //analisa baseado na tag e passa o vetor que quer que compare se a tag existe
            .innerJoin("notes","notes.id","tags.note_id")
            .orderBy("notes.title");
        }else{
            notes = await knex("notes")
            .where({user_id})
            .whereLike("title" , `%${title}%`)
            .orderBy("title");
        }

       //Obtendo tags da nota
        const userTags = await knex("tags").where({ user_id })  //Obtendo tags onde onde a tag seja igual ao id do usuário

        const notesWithTags = notes.map(note =>{
           
            //filtrar tags da nota
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return{
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags);
    }
}

module.exports = NotesController;