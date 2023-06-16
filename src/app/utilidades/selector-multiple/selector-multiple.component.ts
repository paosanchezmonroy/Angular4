import { Component, Input, OnInit } from '@angular/core';
import { MultiplesSelectorModel } from './MultipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit{
  constructor(){}

  @Input()
  Seleccionados: MultiplesSelectorModel[]=[];

  @Input()
  Noseleccionados: MultiplesSelectorModel[]=[];

  ngOnInit(): void {
  }


  Seleccionar(item: MultiplesSelectorModel, index: number){
    this.Seleccionados.push(item);
    this.Noseleccionados.splice(index,1);

  }

  deseleccionar(item: MultiplesSelectorModel, index: number){
    this.Noseleccionados.push(item);
    this.Seleccionados.splice(index,1);
  }

  seleccionarTodo(){
    this.Seleccionados.push(...this.Noseleccionados);
    this.Noseleccionados=[];
  }
  deseleccionarTodo(){
    this.Noseleccionados.push(...this.Seleccionados);
    this.Seleccionados=[];
  }

}
