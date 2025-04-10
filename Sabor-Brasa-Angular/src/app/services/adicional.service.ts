import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional.model'; // Modelo de Adicional

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private apiUrl = 'http://localhost:8090/adicionales';

  constructor(private http: HttpClient) { }

  // Obtener todos los adicionales
  getAll(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(`${this.apiUrl}/all`);
  }

  // Obtener un adicional por ID
  getById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/view/${id}`);
  }

  // Agregar un nuevo adicional
  addAdicional(adicional: Adicional): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, adicional);
  }

  // Eliminar un adicional por ID
  deleteAdicional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Actualizar un adicional
  updateAdicional(id: number, adicional: Adicional): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, adicional);
  }
}