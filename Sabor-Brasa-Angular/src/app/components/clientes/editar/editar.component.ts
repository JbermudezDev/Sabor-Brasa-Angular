import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditarComponent implements OnInit {
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    this.clienteService.findById(id).subscribe({
      next: (data) => {
        this.cliente = data; // Carga los datos del cliente en el formulario
      },
      error: (err) => {
        console.error('Error al obtener el cliente:', err);
      }
    });
  }

  onSubmit(): void {
    this.clienteService.addCliente(this.cliente); // Actualiza el cliente
    this.router.navigate(['/clientes']); // Redirige al listado de clientes
  }
}