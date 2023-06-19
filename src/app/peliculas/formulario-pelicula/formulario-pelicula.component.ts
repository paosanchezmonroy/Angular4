import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MultiplesSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';

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

  generosNoSeleccionados: MultiplesSelectorModel[] = [
    { llave: 1, valor: 'Drama'},
    { llave: 2, valor: 'Accion'},
    { llave: 3, valor: 'Comedia '},
  ];
  

  generosSeleccionados: MultiplesSelectorModel[]=[];

  cinesNoSeleccionados: MultiplesSelectorModel[]=[
    {llave: 1, valor: 'Sambil'},
    {llave: 2, valor: 'cinemex'},
    {llave: 3, valor: 'acropolis'}

  ];

  cinesSeleccionados:  MultiplesSelectorModel[]=[];

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
      poster: '',
      generosId: '',
      cinesIds: ''

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
    const generosId = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosId').setValue(generosId);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    
    this. OnSubmit.emit(this.form.value);   
  }

}
