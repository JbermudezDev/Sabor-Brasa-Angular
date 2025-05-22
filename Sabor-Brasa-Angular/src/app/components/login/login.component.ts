import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string = '';  // admin, cliente, operador
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  onSubmit(): void {
    switch (this.userType) {
      case 'admin':
        this.authService.loginAdministrador(this.email, this.password).subscribe({
          next: (response) => {
            const token = response.token;
            if (token) {
              this.authService.guardarToken(token);
              this.router.navigate(['/administrador']);
            } else {
              this.errorMessage = 'La respuesta no contiene un token válido.';
            }
          },
          error: (err) => this.handleError(err)
        });
        break;

      case 'cliente':
        this.authService.loginCliente(this.email, this.password).subscribe({
          next: (response) => {
            const token = response.token;
            const cliente = response.cliente;

            if (token) {
              this.authService.guardarTokenCliente(token);
            }

            if (cliente) {
              this.authService.guardarCliente(cliente);
              this.carritoService.setClienteId(cliente.id);
            }

            this.router.navigate(['/info-cliente']);
          },
          error: (err) => this.handleError(err)
        });
        break;

      case 'operador':
        this.authService.loginOperador(this.email, this.password).subscribe({
          next: (response) => {
            const token = response.token;
            if (token) {
              this.authService.guardarToken(token);
              this.router.navigate(['/listarOperadores']);
            } else {
              this.errorMessage = 'La respuesta no contiene un token válido.';
            }
          },
          error: (err) => this.handleError(err)
        });
        break;

      default:
        this.errorMessage = 'Por favor seleccione un tipo de usuario.';
    }
  }

  private handleError(err: any): void {
    console.error('Error al iniciar sesión:', err);
    if (err.status === 401) {
      this.errorMessage = 'Credenciales incorrectas. Por favor, intente nuevamente.';
    } else if (err.status === 500) {
      this.errorMessage = 'Error interno del servidor. Intente más tarde.';
    } else {
      this.errorMessage = 'Ocurrió un error inesperado. Por favor, intente nuevamente.';
    }
  }
}
