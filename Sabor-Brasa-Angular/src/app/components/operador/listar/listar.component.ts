import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/operador.model';

@Component({
  selector: 'app-listar-operador',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarOperadorComponent implements OnInit {
  operadores: Operador[] = [];
  filteredOperadores: Operador[] = [];
  searchTerm: string = '';

  constructor(
    private operadorService: OperadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const reloaded = sessionStorage.getItem('reloadedListarOperador');
    if (!reloaded) {
      sessionStorage.setItem('reloadedListarOperador', 'true');
      window.location.reload();
      return;
    } else {
      sessionStorage.removeItem('reloadedListarOperador');
    }

    this.operadorService.getAll().subscribe({
      next: (data) => {
        this.operadores = data;
        this.filteredOperadores = data;
      },
      error: (err) => {
        console.error('Error al obtener los operadores:', err);
      }
    });
  }

  buscarOperadores(): void {
    this.filteredOperadores = this.operadores.filter(operador =>
      operador.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      operador.usuario.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteOperador(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este operador?')) {
      this.operadorService.delete(id).subscribe({
        next: () => {
          this.filteredOperadores = this.filteredOperadores.filter(operador => operador.id !== id);
          this.operadores = this.operadores.filter(operador => operador.id !== id);
          console.log(`Operador con ID ${id} eliminado correctamente.`);
          this.cdr.detectChanges();

          // Refrescar la página después de eliminar
          setTimeout(() => {
            window.location.reload();
          }, 300);
        },
        error: (err) => {
          console.error('Error al eliminar el operador:', err);
        }
      });
    }
  }
}
