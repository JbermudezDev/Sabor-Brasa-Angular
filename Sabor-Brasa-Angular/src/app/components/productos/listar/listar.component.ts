import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          // Actualizar la lista de productos (filtrando el eliminado)
          this.productos = this.productos.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
        }
      });
    }
  }
  
  
  
}