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
    this.productoService.findAll().subscribe({
      next: (data) => {
        this.productos = data; // Asigna todos los productos a la lista completa
        this.filteredProductos = data; // Inicializa la lista filtrada con todos los productos
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
      (producto.descripcion ?? '').toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteById(id).subscribe({
        next: () => {
          // Actualiza las listas eliminando el producto correspondiente
          this.productos = this.productos.filter(producto => producto.id !== id);
          this.filteredProductos = this.filteredProductos.filter(producto => producto.id !== id);
          console.log(`Producto con ID ${id} eliminado correctamente.`);
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          alert('Error al eliminar el producto. Intente nuevamente más tarde.');
        }
      });
    }
  }
}