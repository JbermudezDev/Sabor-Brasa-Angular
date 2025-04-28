import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/carrodecompras.model'; // Modelo de Cliente

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/login';

  private clienteActual!: Cliente; // Cliente logueado

  constructor(private http: HttpClient) {
    // Al iniciar la aplicación, revisamos si ya había un cliente guardado
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

  logiincliente(email: string, password: string): Observable<Cliente> {
    const credenciales = { email, password };
    return this.http.post<Cliente>(`${this.baseUrl}/cliente`, credenciales, { withCredentials: true });
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
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  isClienteLoggedIn(): boolean {
    return !!this.clienteActual;
  }

  getClienteActual(): Cliente | undefined {
    return this.clienteActual;
  }
}
