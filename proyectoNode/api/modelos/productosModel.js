const { response } = require("express");

var productosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productoSchema = new Schema({
    nombre: String,
    pn:String,
    cantidad:String,
    marca:String,
    descripcion:String
})

//nombre de la colección y la estructura que va a tener (se asocia modelo con el esquema)
const myModel = mongoose.model("productos",productoSchema) 


productosModel.Guardar = function(post, callback){
    const instancia = new myModel
    instancia.nombre = post.nombre
    instancia.pn = post.pn
    instancia.cantidad = post.cantidad
    instancia.marca = post.marca
    instancia.descripcion = post.descripcion

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

productosModel.Listar = function(post,callback){
    myModel.find({},{nombre:1,pn:1,cantidad:1,marca:1,descripcion:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

productosModel.Actualizar = function(post,callback){
    myModel.findByIdAndUpdate(post._id,{nombre:post.nombre,pn:post.pn,cantidad:post.cantidad,marca:post.marca,descripcion:post.descripcion},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        }
    })
}

productosModel.Eliminar =function(post,callback){

    myModel.findOneAndDelete({_id:post._id},(error,response)=>{
        if(error){
            return callback({state:false,mensaje:error})
        }
        else{
            return callback({state:true})
        } 
    })
}

productosModel.cargarId = function(post,callback){
    myModel.find({_id:post._id},{nombre:1,pn:1,cantidad:1,marca:1,descripcion:1},(error,documentos)=>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

module.exports.productosModel = productosModel