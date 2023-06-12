import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit{
  constructor(private activatedRoute: ActivatedRoute){}

  modelo: actorCreacionDTO = {nombre: 'Ariel', fechaNacimineto: new Date()}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //alert(params.id);
      //Envia alertas
    })
  }
  guardarCambios(actor: actorCreacionDTO){  
    console.log(actor);
  }

}
