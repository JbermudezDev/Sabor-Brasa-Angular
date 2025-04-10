import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Llamar al servicio para autenticar al administrador
    this.authService.logiincliente(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/pordefinir']);
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
