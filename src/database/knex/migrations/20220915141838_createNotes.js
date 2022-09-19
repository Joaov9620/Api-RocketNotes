//processo de criar a tabela
exports.up = knex => knex.schema.createTable("notes" , table =>{
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users") ;//criando um campo na tabela chamado user_id que faz referencia ao id que existe dentro da tabela do usuario

    table.timestamp("created_at").default(knex.fn.now()); //default(knex.fn.now()) gera o timestamp . FN = que tem uma função. now() =  função. knex = propriedade do knex
    table.timestamp("updated_at").default(knex.fn.now());
});

//processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("notes");
