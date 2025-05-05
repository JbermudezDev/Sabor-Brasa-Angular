import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';
import { ProductoService } from 'src/app/services/producto.service';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-info-plato',
  templateUrl: './info-plato.component.html',
  styleUrls: ['./info-plato.component.css']
})
export class InfoPlatoComponent implements OnInit {
  producto!: Producto;
  adicionales: Adicional[] = [];
  adicionalesSeleccionados: Adicional[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('ID de producto inválido');
      this.router.navigate(['/menu']);
      return;
    }

    this.productoService.getInfoPlato(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.adicionales = producto.adicionales || [];
      },
      error: (err) => {
        console.error('Error al cargar la información del plato:', err);
        alert('No se pudo cargar la información del plato');
      }
    });
  }

  toggleAdicional(adicional: Adicional): void {
    const index = this.adicionalesSeleccionados.findIndex(a => a.id === adicional.id);
    if (index === -1) {
      this.adicionalesSeleccionados.push(adicional);
    } else {
      this.adicionalesSeleccionados.splice(index, 1);
    }
  }

  agregarAlCarrito(): void {
    if (!this.authService.isClienteLoggedIn()) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this.router.navigate(['/login-cliente']);
      return;
    }

    if (!this.producto) return;

    const item: ItemCarrito = {
      producto: this.producto,
      adicionales: this.adicionalesSeleccionados,
      total: this.getTotal()
    };

    this.carritoService.agregar(item);
    alert('Producto agregado al carrito con éxito');
    this.router.navigate(['/menu']);
  }

  esAdicionalSeleccionado(adicionalId: number): boolean {
    return this.adicionalesSeleccionados.some(a => a.id === adicionalId);
  }

  getTotal(): number {
    const precioAdicionales = this.adicionalesSeleccionados.reduce((s, a) => s + a.precio, 0);
    return this.producto.precio + precioAdicionales;
  }
}
