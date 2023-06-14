import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent {

  constructor(public msg:MensajesService, private peticion:PeticionesService, private route:Router){}

  nombre:string=""
  email:string=""
  mensaje:string=""
  estado:string=""
  
  guardar(){
    let post = {
      host:this.peticion.urllocal,
      path:"/contactenos/guardar", 
      payload: {
        nombre:this.nombre,
        email:this.email,
        mensaje:this.mensaje,
        estado:"Sin resolver"
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
}
