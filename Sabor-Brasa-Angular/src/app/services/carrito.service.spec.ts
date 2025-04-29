import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Adicional } from '../models/adicional.model';

export interface ItemCarrito {
  producto: Producto;
  adicionales: Adicional[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: ItemCarrito[] = [];
  private clienteId?: number;  // Cliente logueado

  constructor() {
    // ✅ Al iniciar el servicio, carga carrito y clienteId desde localStorage
    const storedCarrito = localStorage.getItem('carrito');
    if (storedCarrito) {
      this.carrito = JSON.parse(storedCarrito);
    }

    const storedClienteId = localStorage.getItem('clienteId');
    if (storedClienteId) {
      this.clienteId = parseInt(storedClienteId, 10);
    }
  }

  agregar(item: ItemCarrito): void {
    this.carrito.push(item);
    this.guardarCarrito();
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  eliminar(index: number): void {
    this.carrito.splice(index, 1);
    this.guardarCarrito();
  }

  limpiar(): void {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  calcularTotalGeneral(): number {
    return this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

  private guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // --- Funciones de cliente ---

  setClienteId(id: number): void {
    this.clienteId = id;
    localStorage.setItem('clienteId', id.toString());
  }

  getClienteId(): number | undefined {
    if (this.clienteId) {
      return this.clienteId;
    }
    const storedId = localStorage.getItem('clienteId');
    if (storedId) {
      this.clienteId = parseInt(storedId, 10);
      return this.clienteId;
    }
    return undefined;
  }
}
