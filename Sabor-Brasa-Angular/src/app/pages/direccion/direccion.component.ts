import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  producto!: Producto;
  adicionales: Adicional[] = [];
  total!: number;

 // Dirección
 ciudad: string = '';
 barrio: string = '';
 direccion: string = ''; 
 tipoInmueble: string = '';
 complemento: string = '';
 instrucciones: string = '';

  constructor(
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const state = history.state;
    this.producto = state.producto;
    this.adicionales = state.adicionales;
    this.total = state.total;
  }

  confirmarDireccion(): void {
    const item: ItemCarrito = {
      producto: this.producto,
      adicionales: this.adicionales,
      total: this.total,
      clienteId: 1 // Asignar un valor adecuado para clienteId
      // se puede extender esto con una interfaz para "Direccion"
    };


    this.carritoService.guardarCarritoEnServidor(item).subscribe({
      next: (response) => {
        console.log('Carrito guardado en el servidor:', response);
      },
      error: (error) => {
        console.error('Error al guardar el carrito en el servidor:', error);
      }
    });

    // Redirigir a otra vista o mostrar pop-up
    this.router.navigate(['/menu']); // por ahora vuelve al menú
  }
}
