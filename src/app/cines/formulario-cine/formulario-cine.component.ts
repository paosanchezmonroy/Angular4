import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cineCreacionDTO } from '../cine';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit{
  constructor(private formBuilder: FormBuilder){}

  form: FormGroup;
  @Input()
  modelo:cineCreacionDTO;

  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenadasIniciales: Coordenada[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      latitud:[
        '',
        {
          validators: [Validators.required],
        }
      ],
      longitud: [
        '',
        {
          validators: [Validators.required],
        }
      ]
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenadasIniciales.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud});
    }
  }

  OnSubmit(){
    this.guardarCambios.emit(this.form.value);

  }

  coordenadasSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada);

  }
}
