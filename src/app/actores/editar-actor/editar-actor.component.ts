import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit{
  constructor(private activatedRoute: ActivatedRoute){}

  modelo: actorDTO = {nombre: 'Ariel', fechaNacimineto: new Date(), foto: 'https://cdn.mos.cms.futurecdn.net/d9VN7jtsJfuVFV5bV88N8D-320-80.jpg'};
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
