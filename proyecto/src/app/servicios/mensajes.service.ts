import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }//

  datos:any[] = []
  
  load(mensaje:string,tipo:string,tiempo:number){
    this.datos.push({mensaje:mensaje,tipo:tipo})
    this.borrar(tiempo)
  }
  borrar(tiempo:number){
    setTimeout(() => {
      this.datos.splice(0,1)
    }, tiempo);
  }
}
