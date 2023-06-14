import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

declare var $:any

@Component({
  selector: 'app-usproductos',
  templateUrl: './usproductos.component.html',
  styleUrls: ['./usproductos.component.css']
})
export class UsproductosComponent implements OnInit{

  constructor(public msg:MensajesService, public peticion:PeticionesService, private route:Router){}

 ngOnInit(){
    this.listar()
    this.midata()
  }

datos:any[]=[]

listar(){
  var post = {
    host:this.peticion.urllocal,
    path:"/productos/listar", 
    payload: {
    }
  }
  this.peticion.post(post.host+post.path,post.payload)
  .then((res:any)=>{
      this.datos = res.datos
    }
    
  )
}

destino:string=""
laboratorio:string=""
direccion:string=""
contacto:string=""
nrocontacto:string=""
estado: string="Sin procesar"
nombre: string=""
pnp: string=""
fecha:string=""

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
    }
  )
}

guardarpedido(){
  let post = {
    host:this.peticion.urllocal,
    path:"/pedidos/guardar", 
    payload: {
      fecha: this.fecha,
      usnombre: this.nombre,
      destino: this.destino,
      laboratorio: this.laboratorio,
      direccion: this.direccion,
      contacto: this.contacto,
      nrocontacto: this.nrocontacto,
      estado:this.estado
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

}

