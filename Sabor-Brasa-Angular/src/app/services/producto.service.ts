import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model'; // Asegúrate de tener un modelo para Producto
import { Adicional } from '../models/adicional.model'; // Asegúrate de tener un modelo para Adicional

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8090/productos'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
   // Obtener todos los productos con sus adicionales
   getAllProductos(): Observable<{ productosList: Producto[]; adicionalesList: Adicional[] }> {
    return this.http.get<{ productosList: Producto[]; adicionalesList: Adicional[] }>(`${this.baseUrl}/all`);
  }

  // Obtener un producto por ID
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/find/${id}`);
  }

  // Obtener formulario para agregar un producto (producto vacío y lista de adicionales)
  getFormularioAgregarProducto(): Observable<{ producto: Producto; adicionales: Adicional[] }> {
    return this.http.get<{ producto: Producto; adicionales: Adicional[] }>(`${this.baseUrl}/agregar`);
  }

  // Agregar un nuevo producto
  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/add`, producto);
  }

  // Modificar un producto existente
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/update/${id}`, producto);
  }

  // Eliminar un producto por ID
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Obtener el menú con productos
  getMenu(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/Menu`);
  }

  // Obtener información de un plato por ID
  getInfoPlato(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/info/${id}`);
  }
}