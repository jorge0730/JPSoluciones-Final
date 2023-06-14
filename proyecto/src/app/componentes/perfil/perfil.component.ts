import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  constructor(public msg:MensajesService, private peticion:PeticionesService, private route:Router){}

  nombre:string=""
  email:string=""
  password:string=""
  _id:string=""
  rol:string=""

 ngOnInit(){
    this.midata()
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
       }else{
         this.msg.load(res.mensaje,"danger",3000)
       }
       
     }
   )
  }

midata(){
  var post = {
    host:this.peticion.urllocal,
    path:"/midata", 
    payload: {
    }
  }
  this.peticion.post(post.host+post.path,post.payload).then(
    (res:any)=>{
      this.nombre=res.nombre
      this.email=res.email
      this.password=res.password
      this.rol=res.rol
      this._id=res._id
    }
  )
}
}

