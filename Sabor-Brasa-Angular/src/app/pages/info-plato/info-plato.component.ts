import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';
import { ProductoService } from 'src/app/services/producto.service';
import { CarritoService } from 'src/app/services/carrito.service'; // Importa CarritoService
import { ItemCarrito } from 'src/app/models/carrodecompras.model';
import { AuthService } from 'src/app/services/auth-service.service'; // Importa AuthService

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
    private carritoService: CarritoService, // Inyecta CarritoService
    private authService: AuthService, // Inyecta AuthService
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getInfoPlato(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.adicionales = producto.adicionales || [];
      },
      error: (err) => {
        console.error('Error al cargar la información del plato:', err);
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
    if (!this.authService.isClienteLoggedIn) {
      // Si no está logueado, redirige a login
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this.router.navigate(['/login-cliente']);
      return;
    }

    if (this.producto) {
      const item: ItemCarrito = {
        producto: this.producto,
        adicionales: this.adicionalesSeleccionados,
        total: this.getTotal()
      };

      this.carritoService.agregar(item);
      alert('Producto agregado al carrito');
    }
  }

  esAdicionalSeleccionado(adicionalId: number): boolean {
    return this.adicionalesSeleccionados.some(a => a.id === adicionalId);
  }

  getTotal(): number {
    return this.producto.precio + this.adicionalesSeleccionados.reduce((s, a) => s + a.precio, 0);
  }
}