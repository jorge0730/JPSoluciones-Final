import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

declare var $:any

@Component({
  selector: 'app-adusuarios',
  templateUrl: './adusuarios.component.html',
  styleUrls: ['./adusuarios.component.css']
})
export class AdusuariosComponent implements OnInit{

  constructor(public msg:MensajesService, private peticion:PeticionesService, private route:Router){}

  nombre:string=""
  email:string=""
  password:string=""
  _id:string=""
  rol:string=""

nuevo(){
  $('#staticBackdrop').modal('show')
  this.nombre=""
  this.email=""
  this.password=""
  this.rol=""
}

 ngOnInit(){
    this.listar()
  }

actualizar(){
   let post = {
     host:this.peticion.urllocal,
     path:"/usuario/actualizar", 
     payload: {
      _id:this._id,
      nombre:this.nombre,
      email:this.email,
      password:this.password,
      rol:this.rol
     }
   }
   this.peticion.post(post.host+post.path,post.payload).then(
     (res:any)=>{
       if(res.state == true){
         this.msg.load(res.mensaje,"success",3000)
         this.listar()
       }else{
         this.msg.load(res.mensaje,"danger",3000)
       }
       
     }
   )
  }

editar(identificador:string){
    console.log(identificador)
    this._id=identificador

    let post = {
      host:this.peticion.urllocal,
      path:"/usuario/cargarId", 
      payload: {
        _id:this._id
      }
    }
    this.peticion.post(post.host+post.path,post.payload).then((res:any)=>{
      if(res.datos!=undefined){
        console.log(res.datos[0])
        this.nombre = res.datos[0].nombre
        this.email = res.datos[0].email
        this.password = res.datos[0].password
        this.rol = res.datos[0].rol
        $('#exampleModal').modal('show')
      }
      
    }
      
    )
    
  }
  
 guardar(){
   let post = {
     host:this.peticion.urllocal,
     path:"/usuario/guardar", 
     payload: {
       nombre:this.nombre,
       email:this.email,
       password:this.password,
       rol:this.rol
     }
   }
   this.peticion.post(post.host+post.path,post.payload).then(
     (res:any)=>{
       if(res.state == false){
        this.msg.load(res.mensaje,"danger",3000)     
       }else{
        this.msg.load(res.mensaje,"success",3000)
        this.listar()
       }
       
     }
   )
 }

 eliminar(email:string){
  let post = {
    host:this.peticion.urllocal,
    path:"/usuario/eliminar", 
    payload: {
      email:email
    }
  }
  this.peticion.post(post.host+post.path,post.payload).then(
    (res:any)=>{
      if(res.state == true){
        this.msg.load(res.mensaje,"success",3000)
        this.listar()
      }else{
        this.msg.load(res.mensaje,"danger",3000)     
      }
      
    }
  )
}

datos:any[]=[]

listar(){
  var post = {
    host:this.peticion.urllocal,
    path:"/usuario/listar", 
    payload: {
    }
  }
  this.peticion.post(post.host+post.path,post.payload)
  .then((res:any)=>{
      this.datos = res.datos
    }
    
  )
}

}
