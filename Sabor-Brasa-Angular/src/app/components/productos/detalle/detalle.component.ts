import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CurrencyPipe]
})

export class DetalleComponent implements OnInit {
  producto: Producto | undefined;

  constructor(
    private route: ActivatedRoute, 
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.productoService.getProductoById(id).subscribe({
        next: (data) => {
          this.producto = data;
        },
        error: (err) => {
          console.error('Error al obtener el producto:', err);
        }
      });
    } else {
      console.error('ID de producto inválido');
    }
  }
}
