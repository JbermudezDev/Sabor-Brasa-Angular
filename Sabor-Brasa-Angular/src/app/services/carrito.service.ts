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

  constructor() {}

  agregar(item: ItemCarrito): void {
    this.carrito.push(item);
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  eliminar(index: number): void {
    this.carrito.splice(index, 1);
  }

  limpiar(): void {
    this.carrito = [];
  }

  calcularTotalGeneral(): number {
    return this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

  //  Esta es la propiedad que necesita CarritoIconComponent:
  get items(): ItemCarrito[] {
    return this.carrito;
  }
}
