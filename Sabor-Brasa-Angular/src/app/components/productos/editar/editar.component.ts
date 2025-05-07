import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    adicionales: [] // Inicializar como un arreglo vacío
  };

  adicionales: Adicional[] = []; // Lista de adicionales disponibles

  constructor(
    private productoService: ProductoService,
    private adicionalService: AdicionalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID del producto desde la URL
    this.getProducto(id);
    this.getAdicionales();
  }

  // Obtener el producto por ID
  getProducto(id: number): void {
    this.productoService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        alert('Ocurrió un error al cargar el producto. Por favor, inténtelo nuevamente.');
      }
    });
  }

  // Obtener la lista de adicionales disponibles
  getAdicionales(): void {
    this.adicionalService.getAdicionales().subscribe({
      next: (data) => {
        console.log('Adicionales cargados:', data);
        this.adicionales = data;
      },
      error: (err) => {
        console.error('Error al cargar los adicionales:', err);
        alert('Ocurrió un error al cargar los adicionales. Por favor, inténtelo nuevamente.');
      }
    });
  }
  // Alternar la selección de un adicional
  toggleAdicional(adicional: Adicional): void {
    if (!this.producto.adicionales) {
      this.producto.adicionales = []; // Inicializa adicionales si es undefined
    }

    const index = this.producto.adicionales.findIndex(a => a.id === adicional.id);
    if (index === -1) {
      this.producto.adicionales.push(adicional); // Agregar adicional si no está seleccionado
    } else {
      this.producto.adicionales.splice(index, 1); // Eliminar adicional si ya está seleccionado
    }
  }

  // Verificar si un adicional está seleccionado
  isAdicionalSelected(adicional: Adicional): boolean {
    if (!this.producto.adicionales) {
      return false; // Si adicionales no está definido, retorna false
    }
    return this.producto.adicionales.some(a => a.id === adicional.id);
  }

  // Enviar el producto actualizado al backend
  onSubmit(): void {
    if (!this.producto.adicionales) {
      this.producto.adicionales = []; // Asegúrate de que adicionales sea un arreglo
    }

    const productoActualizado = {
      ...this.producto,
      adicionales: this.producto.adicionales.map(a => ({ id: a.id })) // Solo envía los IDs de los adicionales
    };

    console.log('Datos enviados al backend:', productoActualizado);

    this.productoService.updateProducto(this.producto.id, productoActualizado).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/productos']); // Redirigir al listado de productos
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        alert('Ocurrió un error al actualizar el producto. Por favor, inténtelo nuevamente.');
      }
    });
  }
}
