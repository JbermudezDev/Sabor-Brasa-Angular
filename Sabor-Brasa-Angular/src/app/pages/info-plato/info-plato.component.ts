import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Adicional } from 'src/app/models/adicional.model';
import { ProductoService } from 'src/app/services/producto.service';

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
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getInfoPlato(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.adicionales = producto.adicionales || [];
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
    const total = this.producto.precio + this.adicionalesSeleccionados.reduce((sum, a) => sum + a.precio, 0);

    this.router.navigate(['/direccion'], {
      state: {
        producto: this.producto,
        adicionales: this.adicionalesSeleccionados,
        total: total
      }
    });
  }
  esAdicionalSeleccionado(adicionalId: number): boolean {
    return this.adicionalesSeleccionados.some(a => a.id === adicionalId);
  }
  getTotal(): number {
    return this.producto.precio + this.adicionalesSeleccionados.reduce((s, a) => s + a.precio, 0);
  }
 
}
