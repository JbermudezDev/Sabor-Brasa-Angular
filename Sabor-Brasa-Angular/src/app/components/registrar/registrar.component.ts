import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrarComponent {
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  };

  constructor(private clienteService: ClienteService, private router: Router) {}

 
  mensajeExito: string = '';

onSubmit(): void {
  this.clienteService.addCliente(this.cliente).subscribe({
    next: (data) => {
      this.mensajeExito = '¡Cliente añadido correctamente!';
      console.log('Cliente añadido correctamente:', data);
      this.router.navigate(['/login-cliente']);
    },
    error: (err) => {
      this.mensajeExito = 'Error al añadir el cliente. Por favor, verifique los datos.';
      console.error('Error al añadir el cliente:', err);
    }
  });
}

}