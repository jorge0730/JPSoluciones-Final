const { response } = require("express");

var contactenosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var contactenosSchema = new Schema({
    nombre: String,
    email: String,
    mensaje:String,
    estado:String
})

//nombre de la colección y la estructura que va a tener (se asocia modelo con el esquema)
const myModel = mongoose.model("contactenos",contactenosSchema) 


contactenosModel.Guardar = function(post, callback){
    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.mensaje = post.mensaje
    instancia.estado = post.estado

    instancia.save((error,mensajeCreate)=>{
        if(error){
            console.log(error)
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        }
    })
}

contactenosModel.Listar = function(post,callback){
    myModel.find({},{nombre:1,_id:1,email:1,mensaje:1,estado:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

contactenosModel.Actualizar = function(post,callback){
    myModel.findByIdAndUpdate(post._id,{nombre:post.nombre,email:post.email,mensaje:post.mensaje,estado:post.estado},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        }
    })
}


contactenosModel.cargarId = function(post,callback){
    myModel.find({_id:post._id},{nombre:1,_id:1,email:1,mensaje:1,estado:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

module.exports.contactenosModel = contactenosModel