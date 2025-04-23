import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador } from '../models/operador.model';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  private apiUrl = 'http://localhost:8090/operadores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Operador> {
    return this.http.get<Operador>(`${this.apiUrl}/find/${id}`);
  }

  add(operador: Operador): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, operador);
  }

  update(id: number, operador: Operador): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, operador);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}