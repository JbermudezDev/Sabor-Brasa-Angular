import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional.model'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  constructor( 
    private http: HttpClient
  ) { }

  // Obtener todos los adicionales
  getAdicional(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>('http://localhost:8090/adicionales/all').pipe(
      catchError((error) => {
        console.error('Error al obtener los adicionales:', error);
        return throwError(error);  // Propaga el error
      })
    );
  }

  // Obtener un adicional por su ID
  findById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`http://localhost:8090/adicionales/view/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el adicional por ID:', error);
        return throwError(error);
      })
    );
  }

  // Eliminar un adicional
  deleteById(id: number): void {
    this.http.delete(`http://localhost:8090/adicionales/delete/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el adicional:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  // Agregar un nuevo adicional
  addAdicional(adicional: Adicional): void {
    this.http.post<Adicional>('http://localhost:8090/adicionales/add', adicional).pipe(
      catchError((error) => {
        console.error('Error al agregar el adicional:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  // Actualizar un adicional
  updateAdicional(id: number, adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(`http://localhost:8090/adicionales/update/${id}`, adicional).pipe(
      catchError((error) => {
        console.error('Error al actualizar el adicional:', error);
        return throwError(error);
      })
    );
  }
}