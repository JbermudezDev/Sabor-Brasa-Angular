import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarProductoComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdicionales(); // Cargar la lista de adicionales al iniciar el componente
  }

  // Obtener la lista de adicionales disponibles
  getAdicionales(): void {
    this.adicionalService.getAdicionales().subscribe({
      next: (data) => {
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
    const index = this.producto.adicionales.findIndex(a => a.id === adicional.id);
    if (index === -1) {
      this.producto.adicionales.push(adicional); // Agregar adicional si no está seleccionado
    } else {
      this.producto.adicionales.splice(index, 1); // Eliminar adicional si ya está seleccionado
    }
  }

  // Verificar si un adicional está seleccionado
  isAdicionalSelected(adicional: Adicional): boolean {
    return this.producto.adicionales.some(a => a.id === adicional.id);
  }

  // Enviar el producto al backend
  onSubmit(): void {
    console.log('Producto a enviar:', this.producto); // Verificar los datos antes de enviarlos
    this.productoService.addProducto(this.producto).subscribe({
      next: (nuevoProducto) => {
        console.log('Producto agregado:', nuevoProducto);
        alert('Producto agregado correctamente');
        this.router.navigate(['/productos']); // Redirigir al listado de productos
      },
      error: (err) => {
        console.error('Error al agregar el producto:', err);
        alert('Ocurrió un error al agregar el producto. Por favor, inténtelo nuevamente.');
      }
    });
  }
}