import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarProductoComponent {
  producto: Producto = { 
    nombre: '', 
    precio: 0, 
    categoria: Categoria.ENTRADA 
  };

  constructor(private productoService: ProductoService, private router: Router) { }

  agregarProducto(): void {
    this.productoService.agregarProducto(this.producto).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }
}
