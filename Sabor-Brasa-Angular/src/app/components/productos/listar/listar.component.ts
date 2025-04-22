import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = []; // Lista completa de productos
  filteredProductos: Producto[] = []; // Lista filtrada para búsqueda
  searchTerm: string = ''; // Término de búsqueda

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener todos los productos
    this.productoService.getAllProductos().subscribe({
      next: (data) => {
        this.productos = data.productosList; // Asigna la lista completa de productos
        this.filteredProductos = data.productosList; // Inicializa la lista filtrada con todos los productos
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
      }
    });
  }

  buscarProductos(): void {
    // Filtra los productos según el término de búsqueda
    this.filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      // Llama al servicio para eliminar el producto
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          // Actualiza la lista filtrada eliminando el producto correspondiente
          this.filteredProductos = this.filteredProductos.filter(producto => producto.id !== id);
          // También actualiza la lista completa de productos
          this.productos = this.productos.filter(producto => producto.id !== id);
          console.log(`Producto con ID ${id} eliminado correctamente.`);
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
        }
      });
    }
  }
}