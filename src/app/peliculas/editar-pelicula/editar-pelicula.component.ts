import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit{
  constructor(){}
   
  modelo: PeliculaDTO = {titulo: "Spider-Man", 'trailer':'https://www.youtube.com/watch?v=oBmazlyP220', enCines: true, resumen: 'Spiderman', fechaLanzamiento: new Date(), poster: 'https://m.media-amazon.com/images/I/61Z0dKYVx8L._AC_SS300_.jpg'};
  ngOnInit(): void {

  }

  guardarCambios(pelicula: PeliculaDTO){
    console.log(pelicula);

  }
}
