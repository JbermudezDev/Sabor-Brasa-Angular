import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
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
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.loginAdministrador(this.email, this.password).subscribe({
      next: (response) => {
        // ✅ Guardar el token JWT en localStorage
        const token = response.token;
        if (token) {
          this.authService.guardarToken(token);
          console.log('Inicio de sesión exitoso:', token);
          this.router.navigate(['/administrador']);
        } else {
          this.errorMessage = 'La respuesta no contiene un token válido.';
        }
      },
      error: (err) => {
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
