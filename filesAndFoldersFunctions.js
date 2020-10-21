const fs = require('fs-extra')
const path = require('path')

const createDir = (dirPath) => {

    fs.mkdirSync(dirPath, {recursive: true}, (error)=>{
        if(error){
            console.error('An error occurred',error);
        }

    });

}

const createFile = (filePath, fileContent) =>{

    fs.writeFileSync(filePath, fileContent, (error)=>{

        if(error){
            console.error('An error occurred: ', error)
        }

    })
}

const readFile = (filePath) =>{
   
   return  fs.readFileSync(filePath,'utf8');
}

const copy = (targetPath,newPath) =>{

    fs.copySync(targetPath,newPath)

}

const remove = (dir) =>{

    fs.removeSync(dir)

}

const getFileSize = function(path){

    return fs.statSync(path).size

}

const getAllFilesInDir=function(mainDir){

    var arquivos = [];
    var pilha = [];

    //insere o diretório informado na pilha
    pilha.push(mainDir)

    //executa enquanto a pilha estiver vazia
    while(pilha.length != 0){

        //tira o diretório da pilha
        currentDir = pilha.pop()

        //pega todos arquivos (incluindo pastas) do diretório desempilhado
        filesArray = fs.readdirSync(currentDir, { withFileTypes: true });

        //percorre o array de arquivos filesArray
        for(x in filesArray){

            //cria um 'path' unindo diretório atual e o arquivo iterado
            diretorio = path.join(currentDir,filesArray[x].name)

            //Se o arquivo for um novo diretório, ele é empilhado (para ser iterado futuramente)
            if(filesArray[x].isDirectory()){

                pilha.push(diretorio);

                //Se o arquivo for realmente um arquivo e não um diretório, ele é inserido no array de arquivos que será retornado
            } else{

                //pega o nome do arquivo (ignorando seu diretório)
                name =  filesArray[x].name.substring(0,filesArray[x].name.lastIndexOf('.'))
                

                arquivos.push({"dir":diretorio, "file":name});
            }

        }
    }

    return arquivos;
}


module.exports = {
    createDir,
    createFile,
    readFile,
    copy,
    remove,
    getAllFilesInDir,
    getFileSize
}