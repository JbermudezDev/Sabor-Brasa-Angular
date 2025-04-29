import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';
import { AuthService } from 'src/app/services/auth-service.service';

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
    private carritoService: CarritoService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const state = history.state;
    this.producto = state.producto;
    this.adicionales = state.adicionales;
    this.total = state.total;
  }

  confirmarDireccion(): void {
    const clienteId = this.carritoService.getClienteId();
    const carrito = this.carritoService.obtenerCarrito();
  
    if (!clienteId || carrito.length === 0) {
      alert('No hay cliente logueado o el carrito está vacío.');
      return;
    }
  
    const pedidoPayload = {
      productos: carrito.map((item: ItemCarrito) => ({
        productoId: item.producto.id,
        adicionales: item.adicionales.map(a => a.id)
      }))
    };
  
    this.http.post(`http://localhost:8090/pedidos/confirmar/${clienteId}`, pedidoPayload).subscribe({
      next: () => {
        this.carritoService.limpiar();  // Limpiar carrito local
        alert('¡Pedido confirmado con éxito!');
        this.router.navigate(['/clientes/pedidos']);
      },
      error: (err) => {
        console.error('Error al confirmar el pedido:', err);
        alert('Hubo un error al confirmar el pedido.');
      }
    });
  }
  
}
