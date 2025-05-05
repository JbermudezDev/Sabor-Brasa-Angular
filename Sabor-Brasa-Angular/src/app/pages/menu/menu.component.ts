import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  productos: Producto[] = [];
  clienteId?: number;

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cliente = this.authService.getClienteActual();
    if (!cliente || !cliente.id) {
      alert('Debe iniciar sesión para ver el menú');
      this.router.navigate(['/login-cliente']);
      return;
    }
    this.clienteId = cliente.id;

    this.productoService.getMenu().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar el menú:', err);
      }
    });
  }

  irAInfoPlato(productoId: number): void {
    this.router.navigate(['/info-plato', productoId]);
  }
}
