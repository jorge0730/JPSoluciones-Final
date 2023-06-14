var filesController = {}

filesController.SubirArchivos = function(request,response){

    var post = {}
    post.nombre = request.params.id + '.png'
    post.carpeta = request.params.carpeta
    post.extensiones = [".png",".jpeg", ".gif", ".jpg"]
    var upload = multer({
        storage: multer.diskStorage({
            destination: function(req,file,callback){
                callback(null, appRoot + '/' + post.carpeta )
            },
            filename: function(req,file,callback){
                callback(null,post.nombre)
            }
        }),
        limits: { fileSize: 1048576 }, //10 mb
        fileFilter: function(request,file,callback){
            console.log(file.originalname)
            var ext = path.extname(file.originalname)
            console.log(ext)
            var existe = post.extensiones.indexOf(ext)
            if(existe < 0){
                console.log("Permiso de escritura: DENEGADO")
                return callback({state:false,mensaje:"solo soporta los siguientes formatos: " + post.extensiones.join(" | ")  },null)
            }

            console.log("Permiso de escritura: APROBADO")
            return callback(null,true)

        }
    }).single("userFile")

    upload(request,response,function(err){
        if(err){
            console.log(err)
            response.json(err)
        }
        else{
            console.log('Ok')
            response.json({state:true,mensaje:"Archivo Cargado"})
        }
    })
}

module.exports.filesController = filesController