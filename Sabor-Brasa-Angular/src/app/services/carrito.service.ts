import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Adicional } from '../models/adicional.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemCarrito {
  producto: any;
  adicionales: any[];
  total: number;
  clienteId: number; 

    
  }

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://localhost:8090/api/carrito'; // URL base del backend
  private carrito: ItemCarrito[] = [];
  private clienteId!: number;
  
  

  constructor(private http: HttpClient) {}

  setClienteId(id: number) {
    this.clienteId = id;
  }

  getClienteId(): number {
    return this.clienteId;
  }
  

  agregar(item: Omit<ItemCarrito, 'clienteId'>): void {
    this.carrito.push({ ...item, clienteId: this.clienteId });
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  obtenerCarritoPorCliente(id: number): ItemCarrito[] {
    return this.carrito.filter(item => item.clienteId === id);
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
  guardarCarritoEnServidor(carrito: any): Observable<any> {
    return this.http.post('http://localhost:8090/api/carrito/guardar', carrito);
  }
  
}
