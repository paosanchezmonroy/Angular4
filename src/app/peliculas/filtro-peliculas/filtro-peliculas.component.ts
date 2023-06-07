import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute ){ }
   form: FormGroup

  generos = [
    {id: 1, nombre: 'Drama'},
    {id: 2, nombre: 'Accion'},
    {id: 3, nombre: 'Comedia'},
    {id: 4, nombre: 'terror'}
  ];

  peliculas= [
    {titulo: 'Spider-Man: Far from Home', enCines: false, proximosEstrenos: false, generos: [1,2], poster: 'https://www.cardboardcutoutstandees.com/blog/wp-content/uploads/spiderman-far-from-home-movie-poster-action-400x566.jpg'},
    {titulo: 'Moana', enCines: true, proximosEstrenos: false, generos: [3], poster: 'https://zetatijuana.com/wp-content/uploads/2020/11/moana1.jpg'},
    {titulo: 'Aladdin', enCines: false, proximosEstrenos: true, generos: [4,5], poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJI1TF7JwggC39kBr5Zyhvg8VNErLnMSxqbQswdDA05vk8epixSu7S_oC24mIL7mHAzk&usqp=CAU'}
  ];

  peliculasOriginal = this.peliculas;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };



  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
   
    
    this.form.valueChanges
    .subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
    })
  }

  private leerValoresURL(){
    this.activatedRoute.params.subscribe((params)=>{
      var objeto: any = {};
      
      if(params.titulo){
        objeto.titulo=params.titulo;
      }
      if(params.generoId){
        objeto.generoId=params.generoId;
      }
      if(params.proximosEstrenos)
      {
        objeto.proximosEstrenos=params.proximosEstrenos
      }
    });
  }



  private escribirParametrosBusquedaEnURL(){
    var queryString = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryString.push('titulo=${valoresFormulario.titulo}');
    }
    if(valoresFormulario.generoId){
      queryString.push('generoId=${valoresFormulario.generoId');
    }
    if (valoresFormulario.proximosEstrenos){
      queryString.push('prroximosEstrenos=${valoresFormulario.proximosEstrenos');
    }
    if(valoresFormulario.enCines){
      queryString.push('enCines=${valoresFormulario.enCines}');
    }
    this.location.replaceState('peliculas/buscar',queryString.join('&'));
  }


  buscarPeliculas(valores:any){
    if (valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !==-1 );

    }
    if (valores.generoId){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !==-1 );

    }
    if (valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos );

    }
    if (valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines );

    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
