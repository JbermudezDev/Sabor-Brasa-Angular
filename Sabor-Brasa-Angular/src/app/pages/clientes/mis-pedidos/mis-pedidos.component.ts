import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Cliente } from 'src/app/models/carrodecompras.model';
import { Pedido } from 'src/app/models/pedido.model';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  cliente!: Cliente;

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const clienteActual = this.authService.getClienteActual();
    if (!clienteActual || !clienteActual.id) {
      alert('Debe iniciar sesión para ver sus pedidos');
      return;
    }

    this.pedidoService.obtenerPedidosPorCliente(clienteActual.id).subscribe({
      next: (data: Pedido[]) => {
        this.pedidos = data;
        console.log('Pedidos cargados:', this.pedidos);
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        alert('No se pudieron cargar los pedidos');
      }
    });
  }

  getTotalPedido(pedido: Pedido): number {
    if (!pedido.carrito?.productosSeleccionados) return 0;
  
    let total = 0;
    pedido.carrito.productosSeleccionados.forEach((item) => {
      const precioProducto = item.producto?.precio ?? 0;
      const adicionales = item.adicionales ?? [];
      const adicionalesSum = adicionales.reduce((a, b) => a + (b.precio ?? 0), 0);
  
      console.log(`Producto: ${item.producto?.nombre}, Precio: ${precioProducto}, Adicionales: ${adicionalesSum}`);
      
      total += precioProducto + adicionalesSum;
    });
  
    console.log(`Total para el pedido ${pedido.id}:`, total);
    return total;
  }
  
}
