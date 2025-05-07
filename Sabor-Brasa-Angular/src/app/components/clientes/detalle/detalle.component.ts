import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  cliente: Cliente | undefined;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    this.clienteService.findById(id).subscribe({
      next: (data) => {
        this.cliente = data; // Carga los datos del cliente
      },
      error: (err) => {
        console.error('Error al obtener el cliente:', err);
      }
    });
  }
}
