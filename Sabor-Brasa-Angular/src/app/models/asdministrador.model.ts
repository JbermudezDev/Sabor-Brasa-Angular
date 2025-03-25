// Modelo para Administrador
export interface Administrador {
    id?: number;
    nombre: string;
    email: string;
    password: string;
  }
  
  // Servicio para manejar los administradores
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class AdministradorService {
    private apiUrl = 'http://localhost:8080/api/administradores';
  
    constructor(private http: HttpClient) {}
  
    getAdministradores(): Observable<Administrador[]> {
      return this.http.get<Administrador[]>(this.apiUrl);
    }
  
    addAdministrador(admin: Administrador): Observable<Administrador> {
      return this.http.post<Administrador>(this.apiUrl, admin);
    }
  
    updateAdministrador(admin: Administrador): Observable<Administrador> {
      return this.http.put<Administrador>(`${this.apiUrl}/${admin.id}`, admin);
    }
  
    deleteAdministrador(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
  
  