import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {

  constructor(public msg:MensajesService){}

}
