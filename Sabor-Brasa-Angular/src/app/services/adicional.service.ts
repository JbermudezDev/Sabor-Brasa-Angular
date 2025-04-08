import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional.model';  // Asegúrate de tener este modelo de Adicional

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  constructor( 
    private http: HttpClient
  ) { }

  // Obtener todos los adicionales
  getAllAdicionales(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>('http://localhost:8090/adicionales/all'); // Conexión con el backend de Spring Boot
  }
  // Obtener un adicional por su ID
  findById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`http://localhost:8090/adicionales/view/${id}`);  // Conexión con el backend de Spring Boot
  }

  // Eliminar un adicional
  deleteById(id: number){
    console.log(id);
    this.http.delete(`http://localhost:8090/adicionales/delete/${id}`).subscribe();
  }
  // Agregar un nuevo adicional
  addAdicional(adicional: Adicional){
    this.http.post<Adicional>('http://localhost:8090/adicionales/add', adicional).subscribe();  // Conexión con el backend de Spring Boot
  }

  // Actualizar un adicional
  updateAdicional(id: number, adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(`http://localhost:8090/adicionales/update/${id}`, adicional);
  }
}