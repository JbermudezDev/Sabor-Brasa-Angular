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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        const rol = response.rol?.toUpperCase();
        const usuario = response.usuario;

        if (!token || !rol || !usuario) {
          this.errorMessage = 'Respuesta del servidor incompleta.';
          return;
        }

        // Guardar token, usuario y rol en localStorage
        this.authService.guardarToken(token);
        this.authService.guardarUsuario(usuario);
        this.authService.guardarRol(rol);

        // Redirigir según el rol
        switch (rol) {
          case 'ADMIN':
            this.router.navigate(['/administrador']);
            break;
          case 'CLIENTE':
            this.router.navigate(['/listarDashCliente']);
            break;
          case 'OPERADOR':
            this.router.navigate(['/listarOperadores']);
            break;
          default:
            this.errorMessage = 'Rol no reconocido.';
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage =
          err.status === 401 ? 'Credenciales incorrectas.' :
          err.status === 500 ? 'Error interno del servidor.' :
          'Error inesperado.';
      }
    });
  }
}
