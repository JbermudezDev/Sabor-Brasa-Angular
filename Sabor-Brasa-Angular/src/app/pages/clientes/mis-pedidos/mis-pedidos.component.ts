import { Component, OnInit } from '@angular/core';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: ItemCarrito[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    const clienteId = this.carritoService.getClienteId(); // Nuevo método que podemos agregar
    this.pedidos = this.carritoService.obtenerCarritoPorCliente(clienteId);
  }

  getTotalPedido(pedido: ItemCarrito): number {
    return pedido.total;
  }
}
