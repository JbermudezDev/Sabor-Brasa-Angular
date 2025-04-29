import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-operador',
  templateUrl: './login-operador.component.html',
  styleUrls: ['./login-operador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginOperadorComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Llamar al servicio para autenticar al operador
    this.authService.loginOperador(this.usuario, this.contrasena).subscribe({
      next: (response) => {
        // Redirigir al operador si la autenticación es exitosa
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/listarOperadores']); // Cambia '/dashboard' por la ruta deseada
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