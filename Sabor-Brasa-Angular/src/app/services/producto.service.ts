import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8090/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:8090/productos/all');
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`http://localhost:8090/productos/find/${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`http://localhost:8090/productos/add`, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`http://localhost:8090/productos/update/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/productos/delete/${id}`);
  }
}


