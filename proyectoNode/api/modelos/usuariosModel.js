const { response } = require("express");

var usuariosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    email: String,
    nombre: String,
    password: String,
    rol:String
})

//nombre de la colección y la estructura que va a tener (se asocia modelo con el esquema)
const myModel = mongoose.model("usuarios",userSchema) 


usuariosModel.Guardar = function(post, callback){
    const instancia = new myModel
    instancia.email = post.email
    instancia.nombre = post.nombre
    instancia.password = post.password
    instancia.rol = post.rol

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

usuariosModel.validarEmail = function(post,callback){

    myModel.find({email:post.email} ,{nombre:1,_id:0},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            console.log(documentos.length)
            if(documentos.length == 0){
                return callback ({posicion: -1})
            }
            else{
                return callback ({posicion:documentos.length})
            }
        }
    })
}

usuariosModel.Listar = function(post,callback){
    myModel.find({},{nombre:1,_id:1,email:1,password:1,rol:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

usuariosModel.Actualizar = function(post,callback){
    myModel.findByIdAndUpdate(post._id,{email:post.email,nombre:post.nombre,password:post.password,rol:post.rol},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        }
    })
}

usuariosModel.Eliminar =function(post,callback){

    myModel.findOneAndDelete({email:post.email},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        } 
    })
}

usuariosModel.Login = function(post,callback){

    myModel.find({email:post.email,password:post.password},{nombre:1,_id:1,email:1,password:1,rol:1},(error,documentos)=>{
        if(error){
            return callback({state:false,datos:[0]})
        }
        else{
            return callback({state:true,datos:documentos})
        
        } 
    })
}

usuariosModel.cargarId = function(post,callback){
    myModel.find({_id:post._id},{nombre:1,_id:1,email:1,password:1,rol:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

module.exports.usuariosModel = usuariosModel