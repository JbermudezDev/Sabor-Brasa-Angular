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
    this.authService.logiincliente(this.email, this.password).subscribe({
      next: (cliente) => {
        console.log('Inicio de sesión exitoso:', cliente);

        // ✅ Guardar cliente en sesión local
        this.authService.loginClienteSuccess(cliente);

         
        if (cliente && cliente.id) {
          this.carritoService.setClienteId(cliente.id);
        }

        // Redirigir a info del cliente
        this.router.navigate(['/info-cliente']);
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
