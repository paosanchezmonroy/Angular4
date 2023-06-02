import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetrMayuscula } from 'src/app/utilidades/utilidades/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {
   constructor(private formBuilder: FormBuilder){}
   form: FormGroup;
  
   @Input()
   modelo: generoCreacionDTO;

   @Output()
   Onsubmit:  EventEmitter<generoCreacionDTO> = new EventEmitter <generoCreacionDTO>;
     
  
  ngOnInit(): void {
   this.form = this.formBuilder.group({
    nombre:[ '', {
      validators : [Validators.required, Validators.minLength(3), primeraLetrMayuscula()]
    }]
   });

   if (this.modelo !== undefined){
    this.form.patchValue(this.modelo);
   }
  }
  

  guardarCambios(){
    this.Onsubmit.emit(this.form.value);
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
