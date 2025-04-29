import { Component, OnInit } from '@angular/core';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-carrito-icon',
  templateUrl: './carrito-icon.component.html',
  styleUrls: ['./carrito-icon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarritoIconComponent implements OnInit {
  mostrarModal = false;
  carrito: ItemCarrito[] = []; 

  constructor(
    public carritoService: CarritoService,
    private router: Router, private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Cargamos el carrito al iniciar
    this.carrito = this.carritoService.obtenerCarrito();
  }

  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }

  getTotal(): number {
    return this.carrito.reduce((total, item) => 
      total + item.producto.precio + item.adicionales.reduce((sum, adicional) => sum + adicional.precio, 0),
      0
    );
  }

  calcularSubtotal(item: ItemCarrito): number {
    return item.producto.precio + item.adicionales.reduce((sum, adicional) => sum + adicional.precio, 0);
  }

  irAPagar(): void {
    this.router.navigate(['/direccion']);
  }

  guardarCarritoEnServidor(carrito: any): Observable<any> {
    return this.http.post('/guardar', carrito);
  }
  
}
