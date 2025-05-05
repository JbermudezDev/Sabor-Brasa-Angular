// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { ItemCarrito } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:8090/pedidos';

  constructor(private http: HttpClient) {}

  // Confirmar pedido con estructura DTO esperada por el backend
  confirmarPedido(clienteId: number, items: ItemCarrito[]): Observable<Pedido> {
    const requestBody = {
      clienteId,
      items: items.map(item => ({
        productoId: item.producto.id,
        adicionales: item.adicionales.map(a => a.id)
      }))
    };
    return this.http.post<Pedido>(`${this.baseUrl}/confirmar`, requestBody);
  }

  obtenerPedidosPorCliente(clienteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  listarTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/all`);
  }

  actualizarPedido(
    pedidoId: number,
    estado: string,
    operadorId: number,
    domiciliarioId?: number
  ): Observable<Pedido> {
    const params: string[] = [
      `estado=${estado}`,
      `operadorId=${operadorId}`
    ];
    if (domiciliarioId != null) {
      params.push(`domiciliarioId=${domiciliarioId}`);
    }
    const queryString = params.join('&');

    return this.http.put<Pedido>(
      `${this.baseUrl}/actualizarPedido/${pedidoId}?${queryString}`,
      {}
    );
  }
}
