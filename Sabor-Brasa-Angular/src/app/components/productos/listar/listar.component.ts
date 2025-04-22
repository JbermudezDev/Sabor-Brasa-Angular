import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = []; // Lista de productos
  adicionales: Adicional[] = []; // Lista de adicionales disponiAbles

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos(); // Cargar los productos al iniciar el componente
  }

  // Obtener todos los productos con sus adicionales
  getProductos(): void {
    this.productoService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data.productosList; // Asignar la lista de productos
        this.adicionales = data.adicionalesList; // Asignar la lista de adicionales
        console.log('Productos con adicionales:', this.productos); // Verifica los datos en la consola
        console.log('Adicionales disponibles:', this.adicionales); // Verifica los adicionales
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
        alert('Ocurrió un error al cargar los productos. Por favor, inténtelo nuevamente.');
      }
    });
  }

  // Eliminar un producto 
  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(producto => producto.id !== id);
          alert('Producto eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          alert('Ocurrió un error al eliminar el producto. Por favor, inténtelo nuevamente.');
        }
      });
    }
  }
}