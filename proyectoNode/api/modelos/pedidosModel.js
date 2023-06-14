const { response } = require("express");

var pedidosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var pedidosSchema = new Schema({
    fecha: String,
    usnombre: String,
    destino: String,
    laboratorio: String,
    direccion: String,
    contacto: String,
    nrocontacto: String,
    estado: String
})

//nombre de la colección y la estructura que va a tener (se asocia modelo con el esquema)
const myModel = mongoose.model("pedidos",pedidosSchema) 


pedidosModel.Guardar = function(post, callback){
    const instancia = new myModel
    instancia.fecha = post.fecha
    instancia.usnombre = post.usnombre
    instancia.destino = post.destino
    instancia.laboratorio = post.laboratorio
    instancia.direccion = post.direccion
    instancia.contacto = post.contacto
    instancia.nrocontacto = post.nrocontacto
    instancia.estado = post.estado
    instancia.save((error,userCreate)=>{
        if(error){
            console.log(error)
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        }
    })
}

pedidosModel.Listar = function(post,callback){
    myModel.find({},{fecha:1,usnombre:1,destino:1,laboratorio:1,direccion:1,contacto:1,nrocontacto:1,estado:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datosp:documentos})
        }
    })
}

pedidosModel.Eliminar =function(post,callback){

    myModel.findOneAndDelete({_id:post._id},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        } 
    })
}

pedidosModel.Actualizar = function(post,callback){
    myModel.findByIdAndUpdate(post._id,{usnombre:post.usnombre,fecha:post.fecha,estado:post.estado},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        }
    })
}

pedidosModel.cargarId = function(post,callback){
    myModel.find({_id:post._id},{usnombre:1,_id:1,fecha:1,estado:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}
module.exports.pedidosModel = pedidosModel