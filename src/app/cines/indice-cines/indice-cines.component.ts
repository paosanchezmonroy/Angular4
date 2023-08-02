import { Component } from '@angular/core';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent {
  
  constructor(private cinesService: CinesService){ }

  cines: cineDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosMostrar = 10;
  ngOnInit(): void {
    this.cargarRegistros (this.paginaActual,this.cantidadRegistrosMostrar);
  }

  //metodo para paginacion 
  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.cinesService.obtenerTodos(pagina, cantidadElementosAMostrar)
    .subscribe((respuesta:HttpResponse<cineDTO[]>) => {
      this.cines = respuesta.body; 
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    
    this.paginaActual = datos.pageIndex + 1 ;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);

  }

  borrar(id:number){
    this.cinesService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
    }, error => console.error(error));

  }
}
