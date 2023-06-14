import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';
@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.css']
})
export class HeadermenuComponent implements OnInit{

  constructor(public msg:MensajesService, private peticion:PeticionesService, private route:Router){}
  

  

  logout(){
    let post = {
      host:this.peticion.urllocal,
      path:"/usuario/logout", 
      payload: {
      }
    }
    this.peticion.post(post.host+post.path,post.payload).then(
      (res:any)=>{
        if(res.state == true){
          this.msg.load(res.mensaje,"success",3000)
          this.route.navigate(['login'])
        }else{
          this.msg.load(res.mensaje,"danger",3000)     
        }
        
      }
    )
  }

  ngOnInit():void{
    this.midata()
  }
  nombre:string=""
  rol:string=""
  midata(){
    var post = {
      host:this.peticion.urllocal,
      path:"/midata", 
      payload: {
      }
    }
    this.peticion.post(post.host+post.path,post.payload).then(
      (res:any)=>{
        console.log(res)
        this.nombre=res.nombre
        this.rol=res.rol
      }
    )
  }
}
