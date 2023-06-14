import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-ussolicitudes',
  templateUrl: './ussolicitudes.component.html',
  styleUrls: ['./ussolicitudes.component.css']
})
export class UssolicitudesComponent implements OnInit{

  constructor(public msg:MensajesService, public peticion:PeticionesService, private route:Router){}

  ngOnInit(){
    this.listar()
    this.midata()
  }
    usnombre: String=""
    destino: String=""
    laboratorio: String=""
    direccion: String=""
    contacto: String=""
    nrocontacto: String=""
    estado: String=""
    nombre: string=""
  
 datos:any[]=[]

listar(){
  var post = {
    host:this.peticion.urllocal,
    path:"/pedidos/listar", 
    payload: {
    }
  }
  this.peticion.post(post.host+post.path,post.payload)
  .then((res:any)=>{
      this.datos = res.datosp
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
    }
  )
}

}


