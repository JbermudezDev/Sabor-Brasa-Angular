import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-info-plato',
  templateUrl: './info-plato.component.html',
  styleUrls: ['./info-plato.component.css']
})
export class InfoPlatoComponent implements OnInit {
  producto: Producto | null = null;
  selectedAdicionales: number[] = []; // Lista de IDs de adicionales seleccionados

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productoService.getProductoInfo(id).subscribe({
        next: (data) => {
          this.producto = data;
        },
        error: (err) => {
          console.error('Error al cargar la información del plato:', err);
        }
      });
    }
  }
  toggleAdicional(adicionalId: number): void {
    const index = this.selectedAdicionales.indexOf(adicionalId);
    if (index === -1) {
      this.selectedAdicionales.push(adicionalId);
    } else {
      this.selectedAdicionales.splice(index, 1);
    }
  }

  getAdicionalesSeleccionados(): any[] {
    return this.producto?.adicionales?.filter(a => this.selectedAdicionales.includes(a.id)) || [];
  }

  getTotal(): number {
    const base = this.producto?.precio || 0;
    const adicionales = this.getAdicionalesSeleccionados().reduce((sum, a) => sum + a.precio, 0);
    return base + adicionales;
  }

  agregarAlCarrito(): void {
    const pedido = {
      producto: this.producto,
      adicionales: this.getAdicionalesSeleccionados(),
      total: this.getTotal()
    };
    console.log('Pedido agregado al carrito:', pedido);
    alert('¡Producto agregado al carrito!');
  }

}
