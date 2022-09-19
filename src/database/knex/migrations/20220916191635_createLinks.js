//processo de criar a tabela
exports.up = knex => knex.schema.createTable("links" , table =>{
    table.increments("id");
    table.text("url").notNullable(); //notNullable = não permitir nulo
    //criando um campo na tabela chamado user_id que faz referencia ao id que existe dentro da tabela do usuario
    //onDelete("CASCADE") = se deletar a nota deleta a tag tambem
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now()); //default(knex.fn.now()) gera o timestamp . FN = que tem uma função. now() =  função. knex = propriedade do knex 
});

//processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("links");
