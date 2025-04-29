import { Component, OnInit } from '@angular/core';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-icon',
  templateUrl: './carrito-icon.component.html',
  styleUrls: ['./carrito-icon.component.css']
})
export class CarritoIconComponent implements OnInit {
  mostrarModal = false;
  carrito: ItemCarrito[] = [];

  constructor(
    public carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
    this.actualizarCarrito(); // Cada vez que abres el modal, actualizas el carrito (por si cambió)
  }

  getTotal(): number {
    return this.carrito.reduce((total, item) => 
      total + item.producto.precio + item.adicionales.reduce((sum, adicional) => sum + adicional.precio, 0),
      0
    );
  }

  calcularSubtotal(item: ItemCarrito): number {
    return item.producto.precio + item.adicionales.reduce((sum, adicional) => sum + adicional.precio, 0);
  }

  irAPagar(): void {
    this.router.navigate(['/direccion']);
  }
}
