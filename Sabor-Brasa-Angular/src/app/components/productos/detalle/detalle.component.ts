import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleProductosComponent implements OnInit {
  producto: Producto | undefined; // Producto a mostrar

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('ID inválido');
      return;
    }

    // Llama al servicio para obtener los detalles del producto
    this.productoService.findById(id).subscribe({
      next: (data) => {
        this.producto = data; // Asigna los datos del producto
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
        alert('Error al obtener el producto. Intente nuevamente más tarde.');
      }
    });
  }
}