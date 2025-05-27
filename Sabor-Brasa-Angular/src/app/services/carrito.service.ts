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

  constructor(private http: HttpClient) {
    this.cargarCarritoDeLocalStorage();
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

  getClienteId(): number | null {
    const usuario = localStorage.getItem('usuarioActual');
    const rol = localStorage.getItem('rolUsuario');
    if (usuario && rol === 'CLIENTE') {
      const parsed = JSON.parse(usuario);
      return parsed?.id ?? null;
    }
    return null;
  }
}
