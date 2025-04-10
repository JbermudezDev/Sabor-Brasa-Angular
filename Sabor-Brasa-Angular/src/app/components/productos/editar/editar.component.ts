import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    adicionales: [] // Si el modelo incluye adicionales
  };

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    this.productoService.findById(id).subscribe({
      next: (data) => {
        this.producto = data; // Carga los datos del producto en el formulario
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
      }
    });
  }

  onSubmit(): void {
    this.productoService.updateProducto(this.producto.id, this.producto).subscribe({
      next: () => {
        console.log('Producto actualizado correctamente.');
        this.router.navigate(['/productos']); // Redirige al listado de productos
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
      }
    });
  }
}