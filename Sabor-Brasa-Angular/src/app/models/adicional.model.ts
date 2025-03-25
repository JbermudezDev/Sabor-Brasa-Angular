// Modelo para Adicional
export interface Adicional {
    id?: number;
    nombre: string;
    precio: number;
    descripcion: string;
  }
  
  // Servicio para manejar los adicionales
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class AdicionalService {
    private apiUrl = 'http://localhost:8080/api/adicionales';
  
    constructor(private http: HttpClient) {}
  
    getAdicionales(): Observable<Adicional[]> {
      return this.http.get<Adicional[]>(this.apiUrl);
    }
  
    addAdicional(adicional: Adicional): Observable<Adicional> {
      return this.http.post<Adicional>(this.apiUrl, adicional);
    }
  
    updateAdicional(adicional: Adicional): Observable<Adicional> {
      return this.http.put<Adicional>(`${this.apiUrl}/${adicional.id}`, adicional);
    }
  
    deleteAdicional(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
  
  