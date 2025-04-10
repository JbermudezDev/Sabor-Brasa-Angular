import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/login';

  constructor(private http: HttpClient) {}

  loginAdministrador(email: string, password: string): Observable<any> {
    const credenciales = { email, password };
    return this.http.post(`${this.baseUrl}/admin`, credenciales);
  }
  logiincliente(email: string, password: string): Observable<any> {
    const credenciales = { email, password };
    return this.http.post(`${this.baseUrl}/cliente`, credenciales);
  }
}