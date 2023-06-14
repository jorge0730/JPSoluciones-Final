import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SubirarchivosService } from 'src/app/servicios/subirarchivos.service';

@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrls: ['./subirarchivos.component.css']
})
export class SubirarchivosComponent {

  
  selectedFiles:any;
  archivoseleccionado:any;
  progress = 0;
  message = '';
  booocultarbtns:boolean = false

  constructor( private uploadService: SubirarchivosService ) {}

  @Input() urldestino:string = ""
  @Input() path:string = ""
  @Input() fileName:string = ""


  nombrearchivo:string = "Selecciona el Archivo"

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
    this.nombrearchivo = this.selectedFiles[0].name
    console.log(this.selectedFiles[0].name)
  }

  upload(): void {

    this.progress = 0;
    this.archivoseleccionado = this.selectedFiles.item(0);
  
   
      this.uploadService.upload(this.archivoseleccionado, this.urldestino + this.path ,this.fileName).subscribe(
      (event:any) => {
        console.log(event)
        console.log(event.body)
       
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event.body)
          this.message = event.body.mensaje; 
          if(event.body.state == true){
            this.booocultarbtns = true
          }
          console.log('respondiendo')
       

          setTimeout(() => {
            this.progress = 0
            this.nombrearchivo = 'Selecciona el Archivo'
            this.message = ''
            this.booocultarbtns = false
          }, 2000);
         
        }
      },
      err => {
        this.progress = 0;
        this.nombrearchivo = 'Selecciona el Archivo'
        this.message = 'Se presento un error al subir el archivo!';
        this.archivoseleccionado = undefined;
      
      });

    this.selectedFiles = undefined;
  }

 

}