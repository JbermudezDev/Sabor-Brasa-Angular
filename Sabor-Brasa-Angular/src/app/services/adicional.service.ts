import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional.model';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private baseUrl = 'http://localhost:8090/adicionales'; // Base URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los adicionales
  getAdicionales(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(`${this.baseUrl}/all`);
  }

  // Obtener un adicional por ID
  getAdicionalById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.baseUrl}/find/${id}`);
  }

  // Crear un nuevo adicional
  createAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.baseUrl}/add`, adicional);
  }

  // Actualizar un adicional existente
  updateAdicional(id: number, adicional: Adicional): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${id}`, adicional);
  }

  // Guardar cambios de un adicional (usando POST en lugar de PUT)
  saveAdicional(id: number, adicional: Adicional): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/update/${id}`, adicional);
  }

  // Eliminar un adicional por ID
  deleteAdicional(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/adicionales/delete/${id}`);
  }
}