//arquivo de configurações do upload

const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..","..", "tmp"); //pasta temporaria
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); //pasta onde de fato os arquivos vão ficar

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        //FILENAME: nome do arquivo
        filename(request, file, callback){
            //cria um hash de forma aleatoriao para os nome não serem iguais
            const fileHash = crypto.randomBytes(10).toString("hex");
            //o nome do arquivo será o hash mais o propio nome
            const fileName = `${fileHash}-${file.originalname}`;

            return callback( null, fileName);
        }
    })
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}