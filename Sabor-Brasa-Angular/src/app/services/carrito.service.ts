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
  private clienteId?: number;
  private carritoId?: number;

  constructor() {
    this.cargarCarritoDeLocalStorage();
    this.cargarClienteDeCookies();
    this.cargarCarritoIdDeCookies();
  }

  private cargarCarritoDeLocalStorage(): void {
    const storedClienteId = localStorage.getItem('clienteId');
    if (storedClienteId) {
      const storedCarrito = localStorage.getItem(`carrito_${storedClienteId}`);
      if (storedCarrito) {
        this.carrito = JSON.parse(storedCarrito);
      }
    }
  }

  private cargarClienteDeCookies(): void {
    const clienteIdCookie = this.obtenerCookie('clienteId');
    if (clienteIdCookie) {
      this.clienteId = parseInt(clienteIdCookie, 10);
      localStorage.setItem('clienteId', clienteIdCookie);
    }
  }

  private cargarCarritoIdDeCookies(): void {
    const carritoIdCookie = this.obtenerCookie('carritoId');
    if (carritoIdCookie) {
      this.carritoId = parseInt(carritoIdCookie, 10);
      localStorage.setItem('carritoId', carritoIdCookie);
    }
  }

  private obtenerCookie(nombre: string): string | null {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const [key, value] = c.trim().split('=');
      if (key === nombre) {
        return value;
      }
    }
    return null;
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
    const clienteId = this.getClienteId();
    if (clienteId) {
      localStorage.setItem(`carrito_${clienteId}`, JSON.stringify(this.carrito));
    }
  }

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

  setCarritoId(id: number): void {
    this.carritoId = id;
    localStorage.setItem('carritoId', id.toString());
  }

  getCarritoId(): number | undefined {
    if (this.carritoId) {
      return this.carritoId;
    }
    const storedId = localStorage.getItem('carritoId');
    if (storedId) {
      this.carritoId = parseInt(storedId, 10);
      return this.carritoId;
    }
    return undefined;
  }
}
