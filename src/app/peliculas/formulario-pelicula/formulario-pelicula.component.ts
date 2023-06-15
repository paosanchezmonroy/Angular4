import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder:  FormBuilder){}
  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();


  form: FormGroup;
  @Input()
  modelo: PeliculaDTO;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo:[
        '',
        {
          validators: [Validators.required]
        }
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: ''

    });  

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto);

  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
  }

  guardarCambios(){
    this. OnSubmit.emit(this.form.value);   
  }

}
