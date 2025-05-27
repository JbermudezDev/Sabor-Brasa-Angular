import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.baseUrl}`, body);
  }

  guardarToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  guardarUsuario(usuario: any): void {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    if (usuario?.id) {
      localStorage.setItem('clienteId', usuario.id.toString());
    }
  }

  guardarRol(rol: string): void {
    localStorage.setItem('rolUsuario', rol);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getUsuario(): any | null {
    const data = localStorage.getItem('usuarioActual');
    return data ? JSON.parse(data) : null;
  }

  getRol(): string | null {
    return localStorage.getItem('rolUsuario');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('rolUsuario');
    localStorage.removeItem('clienteId');
    localStorage.removeItem('carrito');
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe();
  }
}
