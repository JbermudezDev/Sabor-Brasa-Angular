import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private baseUrl = 'http://localhost:8090'; // Ajusta si es diferente

  constructor(private http: HttpClient) {}

  loginCliente(email: string, password: string): Observable<Cliente | null> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<Cliente | null>(`${this.baseUrl}/loginCliente`, null, { params }).pipe(
      catchError(() => of(null)) // En caso de error, devolvemos null
    );
  }
}
