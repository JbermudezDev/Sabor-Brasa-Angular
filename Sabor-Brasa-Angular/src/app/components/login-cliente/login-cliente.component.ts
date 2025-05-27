import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CarritoService } from 'src/app/services/carrito.service';
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
    private carritoService: CarritoService,
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

      // Guardar en localStorage
      this.authService.guardarToken(token);
      this.authService.guardarUsuario(usuario);
      this.authService.guardarRol(rol);

      // Guardar clienteId en el carrito si es CLIENTE
      if (rol === 'CLIENTE') {
        
        this.router.navigate(['/info-cliente']);
      } else {
        this.errorMessage = 'No tienes permiso para acceder a esta vista.';
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