import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarProductoComponent {
  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    adicionales: [] // Si el modelo incluye adicionales
  };

  constructor(private productoService: ProductoService, private router: Router) {}

  onSubmit(): void {
    this.productoService.addProducto(this.producto).subscribe({
      next: (data) => {
        console.log('Producto añadido correctamente:', data);
        this.router.navigate(['/productos']); // Redirige al listado de productos
      },
      error: (err) => {
        console.error('Error al añadir el producto:', err);
      }
    });
  }
}