import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

declare var $:any

@Component({
  selector: 'app-admensajes',
  templateUrl: './admensajes.component.html',
  styleUrls: ['./admensajes.component.css']
})
export class AdmensajesComponent implements OnInit {

  constructor(public msg:MensajesService, private peticion:PeticionesService, private route:Router){}

  nombre:string=""
  email:string=""
  mensaje:string=""
  estado:string=""
  _id:string=""

 ngOnInit(){
    this.listar()
  }

datos:any[]=[] 

listar(){
  var post = {
    host:this.peticion.urllocal,
    path:"/contactenos/listar", 
    payload: {
    }
  }
  this.peticion.post(post.host+post.path,post.payload)
  .then((res:any)=>{
      this.datos = res.datos
    }
    
  )
}

actualizar(){
  let post = {
    host:this.peticion.urllocal,
    path:"/contactenos/actualizar", 
    payload: {
      _id:this._id,
      estado:this.estado,
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
     path:"/contactenos/cargarId", 
     payload: {
       _id:this._id
     }
   }
   this.peticion.post(post.host+post.path,post.payload).then((res:any)=>{
     if(res.datos!=undefined){
       console.log(res.datos[0])
       this.estado = res.datos[0].estado
       $('#exampleModal').modal('show')
     }
     
   }     
   )
   
 }
}
