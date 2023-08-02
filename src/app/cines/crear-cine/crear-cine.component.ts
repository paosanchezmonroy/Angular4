import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO } from '../cine';
import { Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent{

  errores: string[] = [];

  constructor(private router: Router, private cinesServices: CinesService) { }
  
  guardarCambios(cine: cineCreacionDTO){
    //...Guardar los cambios 
    console.log(cine)
    this.cinesServices.crear(cine)
    .subscribe(() => {
    this.router.navigate(['/cines']);
    }, (error) => this.errores = parsearErroresAPI(error)
    );
  
  }
}
