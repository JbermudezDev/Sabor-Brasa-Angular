import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { Adicional } from '../models/adicional.model';
import { Observable } from 'rxjs';

export interface ItemCarrito {
  producto: Producto;
  adicionales: Adicional[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://localhost:8090/carrito';
  private carrito: ItemCarrito[] = [];
  private clienteId?: number;
  private carritoId?: number;

  constructor(private http: HttpClient) {
    this.cargarClienteDeCookies();
    this.cargarCarritoIdDeCookies();
    this.cargarCarritoDeLocalStorage();
  }

  private obtenerCookie(nombre: string): string | null {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const [key, value] = c.trim().split('=');
      if (key === nombre) return value;
    }
    return null;
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

  private cargarCarritoDeLocalStorage(): void {
    const datos = localStorage.getItem('carrito');
    if (datos) {
      this.carrito = JSON.parse(datos);
    }
  }

  private guardarCarritoEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  getCarritoDesdeBackend(): Observable<any> {
    if (!this.clienteId) {
      throw new Error('Cliente no autenticado');
    }
    return this.http.get<any>(`${this.baseUrl}/${this.clienteId}`);
  }

  agregar(item: ItemCarrito): void {
    this.carrito.push(item);
    this.guardarCarritoEnLocalStorage();
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  eliminar(index: number): void {
    this.carrito.splice(index, 1);
    this.guardarCarritoEnLocalStorage();
  }

  limpiar(): void {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  calcularTotalGeneral(): number {
    return this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

  setClienteId(id: number): void {
    this.clienteId = id;
    localStorage.setItem('clienteId', id.toString());
  }

  getClienteId(): number | undefined {
    return this.clienteId ?? parseInt(localStorage.getItem('clienteId') || '', 10);
  }

  setCarritoId(id: number): void {
    this.carritoId = id;
    localStorage.setItem('carritoId', id.toString());
  }

  getCarritoId(): number | undefined {
    return this.carritoId ?? parseInt(localStorage.getItem('carritoId') || '', 10);
  }
}
