const { response } = require('express')

var pedidosController = {}
var pedidosModel = require('../modelos/pedidosModel.js').pedidosModel


pedidosController.Listar = function(request,response){
    var post= {}
    pedidosModel.Listar(post,function(respuesta){
        response.json(respuesta)
    })
}

pedidosController.Guardar = function(request,response){
    var post = {
        fecha: request.body.fecha,
        usnombre: request.body.usnombre,
        destino: request.body.destino,
        laboratorio: request.body.laboratorio,
        direccion: request.body.direccion,
        contacto: request.body.contacto,
        nrocontacto: request.body.nrocontacto,
        estado: request.body.estado
    }
    if(post.fecha==undefined || post.fecha==null || post.fecha.trim()==""){
        response.json({state:false,mensaje:"la fecha es un campo obligatorio"})
        return false
    }
    if(post.usnombre == undefined || post.usnombre.trim() == "" || post.usnombre == null){
        response.json({state:false,mensaje:"el nombre es un campo obligatorio"})
        return false
    }

    if(post.destino == undefined || post.destino.trim() == "" || post.destino == null){
        response.json({state:false,mensaje:"el destino es un campo obligatorio"})
        return false
    }  
    if(post.laboratorio == undefined || post.laboratorio.trim() == "" || post.laboratorio == null){
        response.json({state:false,mensaje:"el laboratorio es un campo obligatorio"})
        return false
    }  
    if(post.direccion == undefined || post.direccion.trim() == "" || post.direccion == null){
        response.json({state:false,mensaje:"la dirección es un campo obligatorio"})
        return false
    }  
    if(post.contacto == undefined || post.contacto.trim() == "" || post.contacto == null){
        response.json({state:false,mensaje:"el contacto es un campo obligatorio"})
        return false
    }  
    if(post.nrocontacto == undefined || post.nrocontacto.trim() == "" || post.nrocontacto == null){
        response.json({state:false,mensaje:"el número de contacto es un campo obligatorio"})
        return false
    }  
    pedidosModel.Guardar(post,function(respuesta){
        if(respuesta.state == true){
            console.log(post)
            response.json({state:true,mensaje:"Producto guardado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"No se pudo guardar"})
        }
       
    })
}

pedidosController.Eliminar = function(request,response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == " " || post._id == null){
        response.json({state:false,mensaje:"el id es un campo obligatorio"})
        return false;
    }
    pedidosModel.Eliminar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Pedido eliminado"})
        }
        else{
            response.json({state:false,mensaje:"Error al eliminar"})
        }
    })
}

pedidosController.Actualizar = function(request,response){
    var post = {
        _id:request.body._id,
        usnombre:request.body.usnombre,
        fecha:request.body.fecha,
        estado:request.body.estado
    }
    pedidosModel.Actualizar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Estado actualizado"})
        }
        else{
            response.json({state:false,mensaje:"error al actualizar"})
        }
    })
}
pedidosController.cargarId = function(request,response){
    var post = {
        _id:request.body._id
    }
    pedidosModel.cargarId(post,function(respuesta){
        if(respuesta.state == false){
            response.json({state:false,mensaje:"Error al cargar Id"})
        }
        else{
            response.json(respuesta)
        }
    })
}

module.exports.pedidosController = pedidosController