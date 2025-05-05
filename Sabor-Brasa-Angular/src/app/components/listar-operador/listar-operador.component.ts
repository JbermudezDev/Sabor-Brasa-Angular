import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Pedido } from 'src/app/models/pedido.model';
import { Domiciliario } from 'src/app/models/domiciliario.model';
import { DomiciliarioService } from 'src/app/services/domiciliario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-operador',
  templateUrl: './listar-operador.component.html',
  styleUrls: ['./listar-operador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarOperadoresComponent implements OnInit {
  pedidos: Pedido[] = [];
  domiciliarios: Domiciliario[] = [];
  operadorId!: number;

  estados: string[] = ['recibido', 'cocinando', 'enviado', 'entregado'];

  // Filtros
  filtroCliente: string = '';
  filtroEstado: string = '';

  constructor(
    private pedidoService: PedidoService,
    private domiciliarioService: DomiciliarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const operador = this.authService.getClienteActual();
    if (!operador || !operador.id) {
      alert('Debes iniciar sesión como operador');
      this.router.navigate(['/login']);
      return;
    }
    this.operadorId = operador.id;

    this.pedidoService.listarTodos().subscribe({
      next: (data) => this.pedidos = data,
      error: () => alert('Error al cargar pedidos')
    });

    this.domiciliarioService.obtenerTodos().subscribe({
      next: (data) => this.domiciliarios = data,
      error: () => alert('Error al cargar domiciliarios')
    });
  }

  get pedidosFiltrados(): Pedido[] {
    return this.pedidos.filter(pedido => {
      const coincideCliente = !this.filtroCliente ||
        `${pedido.cliente.nombre} ${pedido.cliente.apellido}`.toLowerCase().includes(this.filtroCliente.toLowerCase());

      const coincideEstado = !this.filtroEstado || pedido.estado === this.filtroEstado;

      return coincideCliente && coincideEstado;
    });
  }

  actualizarPedido(pedido: Pedido): void {
    const estado = pedido.estado;
    const domiciliarioId = pedido.domiciliario?.id;

    this.pedidoService.actualizarPedido(pedido.id, estado, this.operadorId, domiciliarioId).subscribe({
      next: () => alert('Pedido actualizado con éxito'),
      error: () => alert('No se pudo actualizar el pedido')
    });
  }
}
