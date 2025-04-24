import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ItemCarrito } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito-icon',
  templateUrl: './carrito-icon.component.html',
  styleUrls: ['./carrito-icon.component.css']
})
export class CarritoIconComponent {
  mostrarModal = false;

  constructor(public carritoService: CarritoService) {}

  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }

  getTotal(): number {
    return this.carritoService.items.reduce((total, item) =>
      total + item.producto.precio + item.adicionales.reduce((s, a) => s + a.precio, 0), 0
    );
  }
  calcularSubtotal(item: ItemCarrito): number {
    return item.producto.precio + item.adicionales.reduce((sum, a) => sum + a.precio, 0);
  }
  
  
}
