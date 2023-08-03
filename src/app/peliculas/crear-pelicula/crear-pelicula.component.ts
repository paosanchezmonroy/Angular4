import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { MultiplesSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {
  constructor (private peliculasService: PeliculasService){}
  
  errores: string[] = [];
  generosNoSeleccionados: MultiplesSelectorModel[];
  cinesNoSeleccionados: MultiplesSelectorModel[];

  ngOnInit(): void {

    this.peliculasService.postGet()
    .subscribe(resultado => {
      
      this.generosNoSeleccionados = resultado.generos.map(genero => {
        return <MultiplesSelectorModel>{llave: genero.id, valor: genero.nombre}
      });

      this.cinesNoSeleccionados = resultado.cines.map(cines => {
        return <MultiplesSelectorModel>{llave: cines.id, valor: cines.nombre}
      });


    }, error => console.error(error));
  }
  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.errores = []
    console.log(pelicula)
    this.peliculasService.crear(pelicula)
    .subscribe(() => console.log('exitoso'),
    error => this.errores = parsearErroresAPI(error));
  }

}
