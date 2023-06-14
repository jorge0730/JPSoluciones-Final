import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajesService } from './mensajes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http:HttpClient, private msg:MensajesService , private route:Router) { }

  //urllocal:string = "http://127.0.0.1:3000"
  urllocal:string = "http://localhost:3000"
  
  post(url:string,data:{}){
    let promise = new Promise((resolve, reject) => {
      this.http.post(url,data)
      .toPromise()
      .then((res:any)=>{
        console.log(res)
        if(res.error==true){
          this.msg.load(res.mensaje,"danger",5000)
          this.route.navigate(['login'])
        }
        resolve(res)
      })
    })
    return promise
  }

  get(url:string,data:{}){
    let promise = new Promise((resolve, reject) => {
      this.http.get(url,data)
      .toPromise()
      .then((res:any)=>{
        console.log(res)
        if(res.error==true){
          this.msg.load(res.mensaje,"danger",5000)
          this.route.navigate(['login'])
        }
        resolve(res)
      })
    })
    return promise
  }
}
