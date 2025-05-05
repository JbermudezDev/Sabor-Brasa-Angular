import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeleccionarProducto } from  '../models/seleccionarproducto'; 


@Injectable({
  providedIn: 'root'
})
export class SeleccionarProductoService {
  private baseUrl = 'http://localhost:8090/seleccion';

  constructor(private http: HttpClient) {}

  // Agregar un producto al carrito del cliente
  agregarProducto(clienteId: number, productoId: number, cantidad: number): Observable<SeleccionarProducto> {
    return this.http.post<SeleccionarProducto>(
      `${this.baseUrl}/agregar?clienteId=${clienteId}&productoId=${productoId}&cantidad=${cantidad}`,
      {}
    );
  }

  // Listar productos por carrito
  listarPorCarrito(carritoId: number): Observable<SeleccionarProducto[]> {
    return this.http.get<SeleccionarProducto[]>(`${this.baseUrl}/carrito/${carritoId}`);
  }

  // Eliminar un producto del carrito
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`, { responseType: 'text' });
  }
}
