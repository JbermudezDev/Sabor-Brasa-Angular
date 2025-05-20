import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/carrodecompras.model'; // Modelo de Cliente
import { tap as rxjsTap } from 'rxjs/operators';
import { User } from '../models/user.model'; // Modelo de Usuario

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

  loginCliente(email: string, password: string): Observable<any> {
  const body = { email, password };
  return this.http.post<any>('http://localhost:8090/login/cliente', body);
}



guardarTokenCliente(token: string): void {
  localStorage.setItem('jwtTokenCliente', token);
}

guardarCliente(cliente: any): void {
  localStorage.setItem('clienteData', JSON.stringify(cliente));
}

  guardarToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

    loginOperador(usuario: string, contrasena: string): Observable<any> {
      const body = { usuario, contrasena };
      return this.http.post<any>('http://localhost:8090/login/operador', body);
    }




  // ---- Funciones de Cliente ----
  login (user: User): Observable<string> {
    return this.http.post("http://localhost:8090/login/cliente", user, {responseType: 'text'})
  }

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
