import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-adicionales',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarAdicionalComponent implements OnInit {
  adicionales: Adicional[] = [];
  filtro: string = '';

  constructor(
    private adicionalService: AdicionalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAdicionales();
  }

  cargarAdicionales(): void {
    this.adicionalService.getAll().subscribe(data => {
      this.adicionales = data;
    });
  }

  adicionalesFiltrados(): Adicional[] {
    return this.adicionales.filter(a =>
      a.nombre?.toLowerCase().includes(this.filtro.toLowerCase()) ||
      a.descripcion?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  verAdicional(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/adicionales/view', id]);
    }
  }

  editarAdicional(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/adicionales/update', id]);
    }
  }

  eliminarAdicional(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este adicional?')) {
      this.adicionalService.deleteAdicional(id).subscribe(() => {
        this.cargarAdicionales();
      });
    }
  }

  agregarAdicional(): void {
    this.router.navigate(['/adicionales/agregar']);
  }
}