const { response } = require('express')

var contactenosController = {}
var contactenosModel = require('../modelos/contactenosModel.js').contactenosModel


contactenosController.Listar = function(request,response){
    var post= {}
    contactenosModel.Listar(post,function(respuesta){
        response.json(respuesta)
    })
}

contactenosController.Guardar = function(request,response){
    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        mensaje: request.body.mensaje,
        estado:request.body.estado
    }
    if(post.nombre==undefined || post.nombre==null || post.nombre.trim()==""){
        response.json({state:false,mensaje:"el nombre es un campo obligatorio"})
        return false
    }
    if(post.email == undefined || post.email.trim() == "" || post.email == null){
        response.json({state:false,mensaje:"el email es un campo obligatorio"})
        return false
    }
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.email) == false) {
        response.json({ state: false, mensaje: "el campo email no coincide con email valido" })
        return false
    }
    if(post.mensaje == undefined || post.mensaje.trim() == "" || post.mensaje == null){
        response.json({state:false,mensaje:"el mensaje es un campo obligatorio"})
        return false
    }  
    contactenosModel.Guardar(post,function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            console.log(respuesta)
            response.json({state:true,mensaje:"Mensaje enviado correctamente, resolveremos su solicitud lo más pronto posible"})
        }
        else{
            response.json({state:false,mensaje:"No se pudo enviar mensaje"})
        }
       
    })
}

contactenosController.Actualizar = function(request,response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        email:request.body.email,
        mensaje:request.body.mensaje,
        estado:request.body.estado
    }
    contactenosModel.Actualizar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Estado actualizado"})
        }
        else{
            response.json({state:false,mensaje:"error al actualizar"})
        }
    })
}

contactenosController.cargarId = function(request,response){
    var post = {
        _id:request.body._id
    }
    contactenosModel.cargarId(post,function(respuesta){
        if(respuesta.state == false){
            response.json({state:false,mensaje:"Error al cargar Id"})
        }
        else{
            response.json(respuesta)
        }
    })
}

module.exports.contactenosController = contactenosController