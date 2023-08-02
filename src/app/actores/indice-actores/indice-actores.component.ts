import { Component, OnInit } from '@angular/core';
import { ActoresService } from '../actores.service';
import { actorDTO } from '../actor';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent  implements OnInit{
  
  constructor(private actoresServices: ActoresService){ }

  actores: actorDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros (this.paginaActual,this.cantidadRegistrosMostrar);
  }

  //metodo para paginacion 
  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.actoresServices.obtenerTodos(pagina, cantidadElementosAMostrar)
    .subscribe((respuesta:HttpResponse<actorDTO[]>) => {
      this.actores = respuesta.body; 
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    
    this.paginaActual = datos.pageIndex + 1 ;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);

  }

  borrar(id:number){
    this.actoresServices.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
    }, error => console.error(error));

  }
}