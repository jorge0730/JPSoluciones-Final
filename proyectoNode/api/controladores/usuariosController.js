const { response } = require('express')

var usuariosController = {}
var usuariosModel = require('../modelos/usuariosModel.js').usuariosModel

usuariosController.Login = function(request,response){
    var post= {
        email:request.body.email,
        password:request.body.password
    }

    if(post.email == undefined || post.email.trim() == "" || post.email == null){
        response.json({state:false,mensaje:"el email es un campo obligatorio"})
        return false
    }

    if(post.email.length <=10){
        response.json({state:false,mensaje:"el campo email debe tener más caracteres"})
        return false
    }
    
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.email) == false) {
        response.json({ state: false, mensaje: "el campo email no coincide con email valido" })
        return false
    }
    if(post.password == undefined || post.password.trim() == "" || post.password == null){
        response.json({state:false,mensaje:"el campo password es obligatorio"})
        return false
    }

    usuariosModel.Login(post,function(respuesta){
        if(respuesta.state == false){
            response.json({state:false,mensaje:"error incorrectos"})
        }
        else{
            if(respuesta.datos.length==0){
                response.json({state:false,mensaje:"Datos incorrectos"})
            }
            else{
                request.session.nombre= respuesta.datos[0].nombre
                request.session.email= respuesta.datos[0].email
                request.session.rol= respuesta.datos[0].rol
                request.session.password= respuesta.datos[0].password
                request.session._id= respuesta.datos[0]._id
                response.json({state:true,nombre:respuesta.datos[0].nombre,rol:respuesta.datos[0].rol,mensaje:"Bienvenid@ " + request.session.nombre})
            }
        }
    })
}

usuariosController.Listar = function(request,response){
    var post= {}
    usuariosModel.Listar(post,function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.Guardar = function(request,response){
    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
        rol:request.body.rol
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
    if(post.password == undefined || post.password.trim() == "" || post.password == null){
        response.json({state:false,mensaje:"el password es un campo obligatorio"})
        return false
    }  
    if(post.rol == undefined || post.rol.trim() == "" || post.rol == null){
        response.json({state:false,mensaje:"el rol es un campo obligatorio"})
        return false
    }  
    
    usuariosModel.validarEmail(post,function(existe){
        if(existe.posicion == -1){
            usuariosModel.Guardar(post,function(respuesta){
                console.log(respuesta)
                if(respuesta.state == true){
                    response.json({state:true,mensaje:"Usuario guardado correctamente"})
                }
                else{
                    response.json({state:false,mensaje:"No se pudo guardar"})
                }
               
            })
        } 
        else{
            response.json({state:false,mensaje:"El email ya existe"})
        }   
    })
}

usuariosController.Actualizar = function(request,response){
    var post = {
        email:request.body.email,
        nombre:request.body.nombre,
        password:request.body.password,
        _id:request.body._id,
        rol:request.body.rol
    }
    if(post.nombre==undefined || post.nombre.trim()=="" || post.nombre==null){
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
    if(post.password == undefined || post.password.trim() == "" || post.password == null){
        response.json({state:false,mensaje:"el password es un campo obligatorio"})
        return false
    } 
    if(post.rol == undefined || post.rol.trim() == "" || post.rol== null){
        response.json({state:false,mensaje:"el rol es un campo obligatorio"})
        return false
    } 
    usuariosModel.Actualizar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Usuario actualizado"})
        }
        else{
            response.json({state:false,mensaje:"error al actualizar"})
        }
    })
}

usuariosController.Eliminar = function(request,response){
    var post = {
        email:request.body.email
    }
    if(post.email == undefined || post.email == " " || post.email == null){
        response.json({state:false,mensaje:"el email es un campo obligatorio"})
        return false;
    }
    usuariosModel.Eliminar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Usuario eliminado"})
        }
        else{
            response.json({state:false,mensaje:"error al eliminar"})
        }
    })
}

usuariosController.cargarId = function(request,response){
    var post = {
        _id:request.body._id
    }
    usuariosModel.cargarId(post,function(respuesta){
        if(respuesta.state == false){
            response.json({state:false,mensaje:"Error al cargar Id"})
        }
        else{
            response.json(respuesta)
        }
    })
}

module.exports.usuariosController = usuariosController