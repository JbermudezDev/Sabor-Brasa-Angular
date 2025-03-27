import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Hamburguesa', precio: 10000, descripcion: 'Descripción del producto 1', imagen: 'https://via.placeholder.com/150' },
    { id: 2, nombre: 'Perro', precio: 20000, descripcion: 'Descripción del producto 2', imagen: 'https://via.placeholder.com/150' },
    { id: 3, nombre: 'Pizza', precio: 30000, descripcion: 'Descripción del producto 3', imagen: 'https://via.placeholder.com/150' }
  ];

  constructor() {}

  getProductos(): Observable<Producto[]> {
    return of(this.productos);
  }

  createProducto(producto: Producto): Observable<Producto> {
    producto.id = this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) + 1 : 1;
    this.productos.push(producto);
    return of(producto);
  }

  getProductoById(id: number): Observable<Producto | undefined> {
    const producto = this.productos.find(p => p.id === id);
    return of(producto);
  }

  updateProducto(id: number, producto: Producto): Observable<Producto | undefined> {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = producto;
      return of(producto);
    }
    return of(undefined);
  }

  deleteProducto(id: number): Observable<void> {
    this.productos = this.productos.filter(p => p.id !== id);
    return of();
  }
}