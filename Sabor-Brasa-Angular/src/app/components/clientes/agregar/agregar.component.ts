import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
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

  onSubmit(): void {
    this.clienteService.addCliente(this.cliente); // Llama al servicio para agregar el cliente
    this.router.navigate(['/clientes']); // Redirige al listado de clientes
  }
}