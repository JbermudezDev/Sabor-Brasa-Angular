import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
    selector: 'app-login-cliente',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None 
    
    })

export class LoginComponent {
    email: string = '';
    password: string = '';
    error: string = '';
  
    constructor(
      private loginService: LoginService,
      private router: Router
    ) {}
  
    login(): void {
      this.loginService.loginCliente(this.email, this.password).subscribe({
        next: (cliente: Cliente | null) => {
          if (cliente) {
            localStorage.setItem('cliente', JSON.stringify(cliente)); // Guardamos la sesión local
            this.router.navigate(['/cliente']); // Redirige al componente del cliente
          } else {
            this.error = 'Credenciales incorrectas';
          }
        },
        error: () => {
          this.error = 'Error en el servidor o credenciales incorrectas';
        }
      });
    }
  }