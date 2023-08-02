import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { generoDTO } from '../genero';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit{

  constructor(private generosService: GenerosService){ }

  generos: generoDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros (this.paginaActual,this.cantidadRegistrosMostrar);
  }

  //metodo para paginacion 
  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.generosService.obtenerTodos(pagina, cantidadElementosAMostrar)
    .subscribe((respuesta:HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body; 
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    
    this.paginaActual = datos.pageIndex + 1 ;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);

  }

  borrar(id:number){
    this.generosService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
    }, error => console.error(error));

  }
}
