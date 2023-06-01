import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { primeraLetrMayuscula } from 'src/app/utilidades/utilidades/primeraLetraMayuscula';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent implements OnInit{

  constructor(private router: Router, private formBuilder: FormBuilder){ } 

form: FormGroup;
  ngOnInit(): void {
   this.form = this.formBuilder.group({
    nombre:[ '', {
      validators : [Validators.required, Validators.minLength(3), primeraLetrMayuscula()]
    }]
   })
  }


  guardarCambios(){
    //...Guardar los cambios 
    this.router.navigate(['/generos']) 
  }

  obtenerErrorCampoNombre(){
    var campo = this.form.get('nombre');
    if (campo.hasError('required')){
      return 'El campo nombre es requerido';
    }
    if (campo.hasError('minlength')){
      return 'La longitud minima es de 3 caracteres'
    }

    if (campo.hasError('primeraLetrMayuscula')){
      return campo.getError('primeraLetrMayuscula').mensaje;
    }
    return '';
  }
  
  

}
