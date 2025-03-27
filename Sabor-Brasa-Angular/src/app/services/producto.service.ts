// src/app/modules/producto/services/producto.service.ts
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { CategoriaType } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
  })
  export class ComidaService {
    private productos: Producto[] = [
        {
          id: 1,
          nombre: 'Costillas BBQ',
          descripcion: 'Jugosas costillas con salsa BBQ',
          precio: 39000,
          imagen: 'assets/images/costillasmain.jpeg',
          categoria: Categoria.ENTRADA // or some other valid Categoria value
        },
        {
          id: 2,
          nombre: 'Tomahawk',
          descripcion: 'Corte premium para los más exigentes',
          precio: 98000,
          imagen: 'assets/images/tomahawkmain.jpeg',
          categoria: Categoria.PLATO_FUERTE // or some other valid Categoria value
        }
      ];
  

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  crearProducto(producto: Producto): void {
    producto.id = this.productos.length > 0 
      ? Math.max(...this.productos.map(p => p.id).filter(id => id !== undefined)) + 1 
      : 1;
    this.productos.push(producto);
  }
  actualizarProducto(producto: Producto): void {
    const index = this.productos.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productos[index] = producto;
    }
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
  }
}