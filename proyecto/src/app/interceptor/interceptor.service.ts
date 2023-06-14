import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    const requestOption ={
      Headers:new HttpHeaders({

      }),
      withCredentials:true
    }

    const reqClone = req.clone(requestOption)
    console.log(reqClone)
    return next.handle(reqClone)
  }
}
