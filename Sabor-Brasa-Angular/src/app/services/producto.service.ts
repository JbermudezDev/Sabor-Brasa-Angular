import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:8090/productos/all');
  }
  findById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`http://localhost:8090/productos/find/${id}`);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`http://localhost:8090/productos/add`, producto);
  }


  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`http://localhost:8090/productos/update/${id}`, producto);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/productos/delete/${id}`);
  }
}


