import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Adicional {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  private apiUrl = 'http://localhost:8090/adicionales';  // Cambié la URL base para incluir 'adicionales'

  constructor(private http: HttpClient) { }

  // Obtener todos los adicionales
  getAdicionales(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(`${this.apiUrl}/all`);  // Cambié la ruta para hacerla más coherente
  }

  // Obtener un adicional por ID
  getAdicional(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/view/${id}`);  // Cambié la ruta para hacerla más coherente
  }

  // Agregar un nuevo adicional
  addAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.apiUrl}/add`, adicional);  // Cambié la ruta para hacerla más coherente
  }

  // Editar un adicional existente
  updateAdicional(id: number, adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(`${this.apiUrl}/update/${id}`, adicional);  // Cambié la ruta para hacerla más coherente
  }

  // Eliminar un adicional
  deleteAdicional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);  // Cambié la ruta para hacerla más coherente
  }
}
