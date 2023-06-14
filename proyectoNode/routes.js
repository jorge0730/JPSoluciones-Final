
// guardar usuarios
var usuariosController = require('./api/controladores/usuariosController.js').usuariosController



var validarSesion = function(request,response,next){
    console.log(request.session.rol)
    if(request.session.rol == undefined){
        response.json({state:false,error:true,mensaje:"Debe iniciar sesión"})
        return false
    }
    if(request.session.rol != "Logística"){
        response.json({satate:false,error:true,mensaje:"Esta api es solo para administradores"}) 
        return false
         
    } 
     next()

    
}

app.post("/usuario/guardar",validarSesion,function(request,response){
    usuariosController.Guardar(request,response)
})

app.post("/usuario/listar",validarSesion,function(request,response){
    usuariosController.Listar(request,response)
})

app.post("/usuario/actualizar",validarSesion,function(request,response){
    usuariosController.Actualizar(request,response)
})

app.post("/usuario/eliminar",validarSesion,function(request,response){
    usuariosController.Eliminar(request,response)
})

app.post("/usuario/login",function(request,response){
    usuariosController.Login(request,response)
})

app.post("/usuario/logout",function(request,response){
    request.session.destroy()
    response.json({state:true,mensaje:"Sesión finalizada"})
})

app.post("/usuario/cargarId",validarSesion,function(request,response){
    usuariosController.cargarId(request,response)
})

app.post("/midata",function(request,response){
    console.log(request)
    response.json({nombre:request.session.nombre,rol:request.session.rol,_id:request.session._id,email:request.session.email,password:request.session.password})
})
//contactenos

var contactenosController = require('./api/controladores/contactenosController.js').contactenosController

app.post("/contactenos/guardar",function(request,response){
    contactenosController.Guardar(request,response)
})

app.post("/contactenos/listar",function(request,response){
    contactenosController.Listar(request,response)
})

app.post("/contactenos/actualizar",validarSesion,function(request,response){
    contactenosController.Actualizar(request,response)
})

app.post("/contactenos/cargarId",validarSesion,function(request,response){
    contactenosController.cargarId(request,response)
})

//productos

var productosController = require('./api/controladores/productosController.js').productosController

app.post("/productos/guardar",function(request,response){
    productosController.Guardar(request,response)
})

app.post("/productos/listar",function(request,response){
    productosController.Listar(request,response)
})

app.post("/productos/actualizar",function(request,response){
    productosController.Actualizar(request,response)
})

app.post("/productos/cargarId",function(request,response){
    productosController.cargarId(request,response)
})

app.post("/productos/eliminar",function(request,response){
    productosController.Eliminar(request,response)
})


var filesController = require("./api/controladores/filesController.js").filesController


app.post('/files/:carpeta/:id',function(request,response){
    filesController.SubirArchivos(request,response)
})

//pedidos

var pedidosController = require('./api/controladores/pedidosController.js').pedidosController

app.post("/pedidos/guardar",function(request,response){
    pedidosController.Guardar(request,response)
})

app.post("/pedidos/listar",function(request,response){
    pedidosController.Listar(request,response)
})

app.post("/pedidos/eliminar",function(request,response){
    pedidosController.Eliminar(request,response)
})

app.post("/pedidos/actualizar",function(request,response){
    pedidosController.Actualizar(request,response)
})

app.post("/pedidos/cargarId",function(request,response){
    pedidosController.cargarId(request,response)
})

