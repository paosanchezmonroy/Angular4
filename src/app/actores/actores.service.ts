import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO, actorDTO, actorPeliculaDTO } from './actor';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatearFecha } from '../utilidades/utilidades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + 'actores';

  public obtenerTodos(pagina: number, cantidadRegistrosMostrar: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiUrl, { observe: 'response', params });
  }

  public obtenerPorId(id: number): Observable<actorDTO> {
    return this.http.get<actorDTO>(`${this.apiUrl}/${id}`);
  }


  public obtenerPorNombre (nombre: string): Observable<actorPeliculaDTO[]>{
    const headers = new HttpHeaders('Content-Type: application/json');
    console.log(nombre)
    return this.http.post<actorPeliculaDTO[]>(`${this.apiUrl}/buscarPorNombre`,
    JSON.stringify(nombre), {headers});
    
  }

  public crear(actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.http.post(this.apiUrl, formData);
  }

  public editar(id: number, actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);
    console.log(formData)
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  private construirFormData(actor: actorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia) {
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento) {
      console.log(actor.fechaNacimiento)
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }
    console.log(formData)
    return formData;
  }


  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);

  }
}
