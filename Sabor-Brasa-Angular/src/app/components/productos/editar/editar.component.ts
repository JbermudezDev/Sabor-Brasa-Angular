import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = { 
    id: 0, 
    nombre: '', 
    descripcion: '', 
    precio: 0, 
    categoria: { id: 0, nombre: '' } as unknown as Categoria
  };
  adicionales: { id: number; nombre: string; seleccionado: boolean }[] = [
    { id: 1, nombre: 'Adicional 1', seleccionado: false },
    { id: 2, nombre: 'Adicional 2', seleccionado: false },
    { id: 3, nombre: 'Adicional 3', seleccionado: false },
  ];
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      console.error("ID inválido.");
      this.router.navigate(['/productos']);
      return;
    }

    this.productoService.obtenerProductoPorId(id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: (err) => {
        console.error('Error obteniendo el producto:', err);
        this.router.navigate(['/productos']);
      }
    });
  }

  actualizarProducto(): void {
    if (!this.producto.id) {
      console.error("No se puede actualizar un producto sin ID.");
      return;
    }

    this.productoService.actualizarProducto(this.producto.id, this.producto).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error actualizando el producto:', err);
      }
    });
  }
}
