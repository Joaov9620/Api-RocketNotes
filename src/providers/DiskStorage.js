//salvar o arquivo no disco

const fs = require("fs"); //para lidar com manipulação de arquivos
const { diskStorage } = require("multer");
const path = require("path"); //lidar com os diretórios
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file){
        //rename = mudar ele de lugar
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),  //pegar da pasta temporaria
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) //leva para a pasta
        );

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try{
            await fs.promises.stat(filePath);
        }catch{
            return;
        }

        //para deletar usamos o unlink
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;