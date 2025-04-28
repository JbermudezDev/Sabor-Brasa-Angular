import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CarritoService } from 'src/app/services/carrito.service'; // Importa el servicio del carrito
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginClienteComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService, // Inyecta el servicio del carrito
    private router: Router
  ) {}

  onSubmit(): void {
    // Llamar al servicio para autenticar al cliente
    this.authService.logiincliente(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // Asociar el ID del cliente logueado al CarritoService
        if (response && response.id) {
          this.carritoService.setClienteId(response.id);
        }

        // Redirigir a la página de información del cliente
        this.router.navigate(['/info-cliente']);
      },
      error: (err) => {
        // Manejar errores de autenticación
        console.error('Error al iniciar sesión:', err);
        if (err.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, intente nuevamente.';
        } else if (err.status === 500) {
          this.errorMessage = 'Error interno del servidor. Intente más tarde.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Por favor, intente nuevamente.';
        }
      }
    });
  }
}