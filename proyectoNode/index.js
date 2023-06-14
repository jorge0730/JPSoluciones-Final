var express = require("express")
global.app = express()
var config = require("./config").config
var cors = require("cors")
const mongoose = require('mongoose') // paquete para poder conectar a base de datos

global.path = require('path');
global.appRoot = path.resolve(__dirname);
global.multer = require('multer')

// headers
app.all('*', function(request, response, next) {

    var url = request.headers.origin
    response.header('Access-Control-Allow-Origin', url);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    response.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    response.header("Access-Control-Allow-Credentials", "true");

    next()
})

//cors
app.use(cors({
    origin:function(origin,callback){
        console.log(origin)
        if(!origin) return callback(null,true)

        if(config.lista.indexOf(origin) == -1){
            return callback('error de cors',false)
        }
        return callback(null,true)
    }
}))

// conexión con mongo
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/"+config.bd,{useNewUrlParser: true,useUnifiedTopology: true},(error,response) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("Conexión correcta con Mongo")
    }
}) 

// habilitar apis post
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var session = require("express-session")({
    secret:config.clave,
    resave:true,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,maxAge:config.tiempoSesion},
    name:"cookiejpsoluciones",
    rolling:true,
})

app.use(session)


app.use('/',express.static(__dirname + '/frontend')) //acceder al frontend si no hay cors

app.use('/productos',express.static(__dirname + '/productos'))// hacer carpetas publicas

app.listen(config.puerto, function(){
    console.log("Servidor funcionando por el puerto " + config.puerto)
});
require("./routes.js") 
