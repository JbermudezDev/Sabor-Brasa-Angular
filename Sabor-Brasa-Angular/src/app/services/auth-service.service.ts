import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/carrodecompras.model'; // Modelo de Cliente
import { tap as rxjsTap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/login';
  private clienteActual!: Cliente; // Cliente logueado

  constructor(private http: HttpClient) {
    const storedCliente = localStorage.getItem('clienteActual');
    if (storedCliente) {
      this.clienteActual = JSON.parse(storedCliente);
    }
  }

  // ---- LOGINs ----

  loginAdministrador(email: string, password: string): Observable<any> {
    const credenciales = { email, password };
    return this.http.post(`${this.baseUrl}/admin`, credenciales, { withCredentials: true });
  }

  loginCliente(email: string, password: string): Observable<Cliente> {
    const credenciales = { email, password };
    return this.http.post<Cliente>(`${this.baseUrl}/cliente`, credenciales, { withCredentials: true }).pipe(
      rxjsTap((cliente: Cliente) => {
        this.clienteActual = cliente;
        localStorage.setItem('clienteActual', JSON.stringify(cliente));
      })
    );
  }

  loginOperador(usuario: string, contrasena: string): Observable<any> {
    const credenciales = { usuario, contrasena };
    return this.http.post(`${this.baseUrl}/operador`, credenciales, { withCredentials: true });
  }

  // ---- Funciones de Cliente ----

  loginClienteSuccess(cliente: Cliente): void {
    this.clienteActual = cliente;
    localStorage.setItem('clienteActual', JSON.stringify(cliente));
  }

  logoutCliente(): Observable<any> {
    this.clienteActual = undefined!;
    localStorage.removeItem('clienteActual');
    return this.http.post(`${this.baseUrl}/logoutCliente`, {}, { withCredentials: true });
  }

  isClienteLoggedIn(): boolean {
    if (!this.clienteActual) {
      const storedCliente = localStorage.getItem('clienteActual');
      if (storedCliente) {
        this.clienteActual = JSON.parse(storedCliente);
      }
    }
    return !!this.clienteActual;
  }

  getClienteActual(): Cliente | undefined {
    if (!this.clienteActual) {
      const storedCliente = localStorage.getItem('clienteActual');
      if (storedCliente) {
        this.clienteActual = JSON.parse(storedCliente);
      }
    }
    return this.clienteActual;
  }
}
