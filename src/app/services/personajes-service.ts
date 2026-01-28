import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Personajes {
  constructor(private http: HttpClient){}
  private baseUrl = environment.apiESDLA

  obtenerPersonajes(): Observable <any []> {
    return this.http.get<any []>(`${this.baseUrl}listaPersonajes`)
  }

  obtenerPersonaje(id:number): Observable <any []> {
    return this.http.get<any>(`${this.baseUrl}obtenerPersonaje/${id}`)
  }

  insertarPersonaje(personaje: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}insertarPersonaje`, personaje);
  }

  actualizarPersonaje(id: number, personaje: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}actualizarPersonaje/${id}`,personaje)
  }

}
