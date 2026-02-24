import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class JuegoService {
    private baseUrl = environment.apiESDLA;
    
    constructor(private http: HttpClient) {}
    
    empezarPartida(): Observable<any> {
        return this.http.get(`${this.baseUrl}empezarPartida/`);
    }

    obtenerPregunta(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}obtenerPregunta/${id}`);
    }

    comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}respuesta/${idPregunta}/?respuestaUsuario=${respuestaUsuario}`);
    }

    actualizarCorrectas(idPartida: number): Observable<any> {
        return this.http.put(`${this.baseUrl}correcta/${idPartida}/`, {});
    }

    finalizarPartida(idPartida: number) : Observable<any> {
        return this.http.put(`${this.baseUrl}finalizar/${idPartida}/`, {});
    }
}