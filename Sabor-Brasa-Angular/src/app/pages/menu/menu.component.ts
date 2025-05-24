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
  productosFiltrados: Producto[] = [];
  clienteId?: number;
  busqueda: string = '';
  categoriaSeleccionada: string = 'todo';

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
        this.filtrarProductos(); // Aplica filtro inicial
      },
      error: (err) => {
        console.error('Error al cargar el menú:', err);
      }
    });
  }

  irAInfoPlato(productoId: number): void {
    this.router.navigate(['/info-plato', productoId]);
  }

  volverAPedidos(): void {
    this.router.navigate(['/clientes/pedidos']);
  }

  filtrarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.filtrarProductos();
  }
  volverAlPerfil(): void {
  this.router.navigate(['/listarDashCliente']);
}

  filtrarProductos(): void {
    const texto = this.busqueda.trim().toLowerCase();
    const categoria = this.categoriaSeleccionada.toLowerCase();

    this.productosFiltrados = this.productos.filter(producto => {
      const nombre = producto.nombre?.toLowerCase() || '';
      const imagen = producto.imagen?.toLowerCase() || '';

      const coincideBusqueda = nombre.includes(texto);

      // Filtrar por categoría deducida del nombre del archivo
      let coincideCategoria = true;
      if (categoria !== 'todo') {
        switch (categoria) {
          case 'entradas':
            coincideCategoria = imagen.includes('entrada');
            break;
          case 'extras':
            coincideCategoria = imagen.includes('extra');
            break;
          case 'platosfuertes':
            coincideCategoria = imagen.includes('pf');
            break;
          case 'bebidas':
            coincideCategoria = imagen.includes('bebida') && !imagen.includes('coctel') && !imagen.includes('cocktail');
            break;
          case 'cocteles':
            coincideCategoria = imagen.includes('coctel') || imagen.includes('cocktail') || imagen.includes('mojito') ||
                                imagen.includes('cosmopolitan') || imagen.includes('daiquiri') || imagen.includes('piña') ||
                                imagen.includes('tequila') || imagen.includes('caipirinha') || imagen.includes('manhattan') ||
                                imagen.includes('mai') || imagen.includes('blue') || imagen.includes('sex');
            break;
          case 'postres':
            coincideCategoria = imagen.includes('postre') || imagen.includes('cake') || imagen.includes('flan') ||
                                imagen.includes('brownie') || imagen.includes('cheesecake') || imagen.includes('tiramisu');
            break;
          default:
            coincideCategoria = false;
        }
      }

      return coincideBusqueda && coincideCategoria;
    });
  }
}
