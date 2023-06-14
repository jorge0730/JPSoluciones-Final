import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public msg:MensajesService, private peticion:PeticionesService, private route:Router){}
  email:string=""
  password:string=""

  iniciosesion(){
    let post = {
      host:this.peticion.urllocal,
      path:"/usuario/login", 
      payload: {
        email:this.email,
        password:this.password
      }
    }
    this.peticion.post(post.host+post.path,post.payload).then(
      (res:any)=>{
        if(res.state == false){
         this.msg.load(res.mensaje,"danger",3000)     
        }else{
         this.msg.load(res.mensaje,"success",3000)
         if(res.rol=="Ingeniería"){
          this.route.navigate(['ussolicitudes'])
         }
         else{
          this.route.navigate(['adpedidos'])
         }
         
        }
        
      }
    )
  }
}
