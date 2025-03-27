import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarProductoComponent {
  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: ''
  };

  constructor(private productoService: ProductoService, private router: Router) {}

  onSubmit(): void {
    this.productoService.createProducto(this.producto).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }
}