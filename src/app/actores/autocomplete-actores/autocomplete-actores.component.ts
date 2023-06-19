import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {
  constructor(){}
 
  control: FormControl = new FormControl();
  actores = [
    {nombre: 'Tom Holland',personaje: '', foto: 'https://cdn.justjared.com/wp-content/uploads/headlines/2017/08/tom-holland-frog-theory.jpg'},
    {nombre: 'Keanu Revees',personaje: '',foto: 'https://remezcla.com/wp-content/uploads/2022/11/Keanu-Reeves-as-John-Wick-in-John-Wick-4-300x300.jpg'},
    {nombre: 'Henry Cavill',personaje: '', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSErq-tZ8dqAxwGwdCZPabOsfNyV6hKHNOOUg&usqp=CAU'},
  ]
  
  actoresOriginal = this.actores;
  actoresSeleccionados = [];

  columnasAMostrar=['imagen','nombre','personaje','acciones'];
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    });

  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined){
      this.table.renderRows();
    }

  }
  
  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice,1 );
    this.table.renderRows();
  }

}
