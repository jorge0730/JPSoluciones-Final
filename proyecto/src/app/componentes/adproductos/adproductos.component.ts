import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';
import { SubirarchivosService } from 'src/app/servicios/subirarchivos.service';

declare var $:any

@Component({
  selector: 'app-adproductos',
  templateUrl: './adproductos.component.html',
  styleUrls: ['./adproductos.component.css']
})
export class AdproductosComponent implements OnInit{

  constructor(public msg:MensajesService, public peticion:PeticionesService, private route:Router,  private subirarchivos:SubirarchivosService){}

  item:any = {
    destino:this.subirarchivos.baseUrl,
    path:""
  }
  EditarId(identificador:string){
    console.log(identificador)
    this._id = identificador
    this.item.path = '/files/Productos/' + identificador
  }

  nombre:string=""
  pn:string=""
  cantidad:string=""
  marca:string=""
  descripcion:string=""
  _id:string=""

nuevo(){
  $('#staticBackdrop').modal('show')
  this.nombre=""
  this.pn=""
  this.cantidad=""
  this.marca=""
  this.descripcion=""
}

 ngOnInit(){
    this.listar()
  }

actualizar(){
   let post = {
     host:this.peticion.urllocal,
     path:"/productos/actualizar", 
     payload: {
      _id:this._id,
      nombre:this.nombre,
      pn:this.pn,
      cantidad:this.cantidad,
      marca:this.marca,
      descripcion:this.descripcion
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
    this.item.path = "/files/productos/"+ identificador
    var post = {
      host:this.peticion.urllocal,
      path:"/productos/cargarId", 
      payload: {
        _id:this._id
      }
    }
    this.peticion.post(post.host+post.path,post.payload).then((res:any)=>{
      if(res.datos!=undefined){
        console.log(res.datos[0])
        this.nombre = res.datos[0].nombre
        this.pn = res.datos[0].pn
        this.cantidad= res.datos[0].cantidad
        this.marca= res.datos[0].marca
        this.descripcion= res.datos[0].descripcion
        $('#exampleModal').modal('show')
      }      
    }   
    ) 
  }
  
 guardar(){
   let post = {
     host:this.peticion.urllocal,
     path:"/productos/guardar", 
     payload: {
      nombre:this.nombre,
      pn:this.pn,
      cantidad:this.cantidad,
      marca:this.marca,
      descripcion:this.descripcion
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

 eliminar(_id:string){
  console.log(_id)
  let post = {
    host:this.peticion.urllocal,
    path:"/productos/eliminar", 
    payload: {
      _id:_id
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

}
