const { response } = require('express')

var productosController = {}
var productosModel = require('../modelos/productosModel.js').productosModel


productosController.Listar = function(request,response){
    var post= {}
    productosModel.Listar(post,function(respuesta){
        response.json(respuesta)
    })
}

productosController.Guardar = function(request,response){
    var post = {
        nombre: request.body.nombre,
        pn: request.body.pn,
        cantidad: request.body.cantidad,
        marca:request.body.marca,
        descripcion:request.body.descripcion
    }
    if(post.nombre==undefined || post.nombre==null || post.nombre.trim()==""){
        response.json({state:false,mensaje:"el nombre es un campo obligatorio"})
        return false
    }
    if(post.pn == undefined || post.pn.trim() == "" || post.pn == null){
        response.json({state:false,mensaje:"el pn es un campo obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad.trim() == "" || post.cantidad == null){
        response.json({state:false,mensaje:"la cantidad es un campo obligatorio"})
        return false
    }  
    if(post.marca == undefined || post.marca.trim() == "" || post.marca == null){
        response.json({state:false,mensaje:"el marca es un campo obligatorio"})
        return false
    }  
    productosModel.Guardar(post,function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto guardado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"No se pudo guardar"})
        }
       
    })
}

productosController.Actualizar = function(request,response){
    var post = {
        _id:request.body._id,
        nombre: request.body.nombre,
        pn: request.body.pn,
        cantidad: request.body.cantidad,
        marca:request.body.marca,
        descripcion:request.body.descripcion
    }
    if(post.nombre==undefined || post.nombre==null || post.nombre.trim()==""){
        response.json({state:false,mensaje:"el nombre es un campo obligatorio"})
        return false
    }
    if(post.pn == undefined || post.pn.trim() == "" || post.pn == null){
        response.json({state:false,mensaje:"el pn es un campo obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad.trim() == "" || post.cantidad == null){
        response.json({state:false,mensaje:"la cantidad es un campo obligatorio"})
        return false
    }  
    if(post.marca == undefined || post.marca.trim() == "" || post.marca == null){
        response.json({state:false,mensaje:"el marca es un campo obligatorio"})
        return false
    }  
    productosModel.Actualizar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto actualizado"})
        }
        else{
            response.json({state:false,mensaje:"error al actualizar"})
        }
    })
}

productosController.Eliminar = function(request,response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == " " || post._id == null){
        response.json({state:false,mensaje:"el pn es un campo obligatorio"})
        return false;
    }
    productosModel.Eliminar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto eliminado"})
        }
        else{
            response.json({state:false,mensaje:"Error al eliminar"})
        }
    })
}

productosController.cargarId = function(request,response){
    var post = {
        _id:request.body._id
    }
    productosModel.cargarId(post,function(respuesta){
        if(respuesta.state == false){
            response.json({state:false,mensaje:"Error al cargar Id"})
        }
        else{
            response.json(respuesta)
        }
    })
}

module.exports.productosController = productosController