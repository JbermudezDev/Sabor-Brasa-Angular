// src/app/components/carrito-icon/carrito-icon.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-icon',
  templateUrl: './carrito-icon.component.html',
  styleUrls: ['./carrito-icon.component.css']
})
export class CarritoIconComponent implements OnInit {
  carrito: ItemCarrito[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.calcularTotalGeneral();
  }

  eliminarItem(index: number): void {
    this.carritoService.eliminar(index);
    this.cargarCarrito();
  }

  confirmarPedido(): void {
    const clienteId = this.carritoService.getClienteId();
    if (!clienteId || this.carrito.length === 0) {
      alert('Debes iniciar sesión y tener productos en el carrito');
      this.router.navigate(['/login-cliente']);
      return;
    }

    this.pedidoService.confirmarPedido(clienteId, this.carrito).subscribe({
      next: (pedido) => {
        alert('Pedido confirmado con éxito');
        this.carritoService.limpiar();
        this.cargarCarrito();
        this.router.navigate(['/clientes/pedidos']);
      },
      error: (err) => {
        console.error('Error al confirmar pedido:', err);
        alert('No se pudo confirmar el pedido');
      }
    });
  }
}
