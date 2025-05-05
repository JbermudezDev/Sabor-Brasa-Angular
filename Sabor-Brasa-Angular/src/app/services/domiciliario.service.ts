import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domiciliario } from '../models/domiciliario.model';

@Injectable({
  providedIn: 'root'
})
export class DomiciliarioService {
  private baseUrl = 'http://localhost:8090/domiciliarios';

  constructor(private http: HttpClient) {}

  // ✅ Método usado por operador.component.ts
  listarTodos(): Observable<Domiciliario[]> {
    return this.obtenerTodos();
  }

  // Obtener todos los domiciliarios
  obtenerTodos(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(`${this.baseUrl}/all`);
  }

  // Obtener solo los domiciliarios disponibles
  obtenerDisponibles(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(`${this.baseUrl}/disponibles`);
  }

  // Obtener un domiciliario por ID
  obtenerPorId(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.baseUrl}/find/${id}`);
  }

  // Agregar un nuevo domiciliario
  agregar(d: Domiciliario): Observable<Domiciliario> {
    return this.http.post<Domiciliario>(`${this.baseUrl}/add`, d);
  }

  // Actualizar un domiciliario existente
  actualizar(id: number, actualizado: Domiciliario): Observable<Domiciliario> {
    return this.http.put<Domiciliario>(`${this.baseUrl}/update/${id}`, actualizado);
  }

  // Eliminar un domiciliario por ID
  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
