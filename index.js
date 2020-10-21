const js2xmlparser = require("js2xmlparser");
const file = require("./filesAndFoldersFunctions.js")
const util = require('./utils.js');

//Caminho da pasta descompactada contendo o JSON;
var pastaProcessosJson = './Processos';

var arrayFiles = file.getAllFilesInDir(pastaProcessosJson)


// Loop que percorre a pasta e suas subpastas, e cria os arquivos XML dos arquivos encontrados.
for(x in arrayFiles){
    
    var processo    = file.readFile(arrayFiles[x].dir);
    var fileSize    = file.getFileSize(arrayFiles[x].dir);

    //condicional criado para apenas converter aquivos menores que 60.000KB ( para evitar estouro de memória)
    if(fileSize/1024 < 60000){

        processo    = util.stringToJson(processo)
        var xml     = js2xmlparser.parse("person", processo);
        
        //Os XML serão armazenados numa pasta chamada XML.
        file.createFile('xml/'+arrayFiles[x].file+'.xml',xml)
        
    }

}//*/