import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent  implements OnInit{

  constructor() {}

  modelo: cineDTO = {nombre: "cinemex", latitud:19.74457012464283 , longitud:-99.96185302734376};
  ngOnInit(): void {

  }

  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);

  }

}
