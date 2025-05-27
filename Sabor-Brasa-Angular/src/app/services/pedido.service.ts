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

  getPedidosPorDia(): Observable<{ [fecha: string]: number }> {
    return this.http.get<{ [fecha: string]: number }>(`${this.baseUrl}/por-dia`);
  }

  getIngresosPorSemana(): Observable<{ [semana: string]: number }> {
    return this.http.get<{ [semana: string]: number }>(`${this.baseUrl}/ingresos-por-semana`);
  }

  getPedidosRecientes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/recientes`);
  }

  getProductosMasVendidos(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/productos-mas-vendidos`);
  }

  getPedidosPorEstado(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/pedidos-por-estado`);
  }

  getPedidosPorOperador(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/por-operador`);
  }

  getPedidosPorDomiciliario(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/por-domiciliario`);
  }

  getTopClientes(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/top-clientes`);
  }

  descargarPDFPedido(pedidoId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${pedidoId}/pdf`, {
      responseType: 'blob'
    });
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
