//processo de criar a tabela
exports.up = knex => knex.schema.createTable("tags" , table =>{
    table.increments("id");
    table.text("name").notNullable(); //notNullable = não permitir nulo
    //criando um campo na tabela chamado user_id que faz referencia ao id que existe dentro da tabela do usuario
    //onDelete("CASCADE") = se deletar a nota deleta a tag tambem
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users") ; 
});

//processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("tags");
