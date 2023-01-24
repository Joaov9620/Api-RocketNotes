const { hash, compare } = require("bcryptjs"); //pegando a criptografia

const AppError = require("../utils/AppError") //importando o Apperro

const sqliteConnection = require("../database/sqlite") //conectando ao banco

class UserController{
/*
    *Class tem vários métodos dentro como se fossem funçes

    * index  - Get para listar vários registros.
    * show  - Get para exibir um registro especifico.
    * create  - Post  para criar um registro.
    * update - Put para atualizar um registro.
    * delete - Delete para remover um registro.
*/


    async create(request, response){
        
        const { name, email, password } = request.body;

        const database = await sqliteConnection(); //conectando o banco

        //get = buscar por informações
        //? = é substituido pelo email 
        const checkUsersExists  = await database.get("SELECT * FROM users WHERE email = (?)" , [email]) //verificar se o email já existe

        if(checkUsersExists){
            throw new AppError("Este e-mail já está em uso.") 
        }

        const hashedPassword = await hash(password, 8) //criptografando a senha

        //inserindo valores no banco
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword]
        ) 

        return response.status(201).json();
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;  //desistruturando, para pegar o nome e email

        const user_id = request.user.id;
        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]); //pegando o usuário pelo id
        //se o usuário não for encontrado
        if(!user){
            throw new AppError("Usuário não encontrado")
        }
     
        //se email já existe
        const userWithUpdatedEmail =  await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        //se email já existe e se email é de outra pessoa
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.")
        }

        user.name = name ?? user.name;  //se não existir conteúdo no name então deixe o mesmo nome de antes, para evitar que o valor seja nulo
        user.email = email ?? user.email;


        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.")
            }

            user.password = await hash(password, 8)
        }

        //executando o update
        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        )
        //datetime = gera a data atual pelo própio banco

        return response.status(200).json();
    }

}

module.exports = UserController;