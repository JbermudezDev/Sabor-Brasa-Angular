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
  operadores: Operador[] = []; // Lista completa de operadores
  filteredOperadores: Operador[] = []; // Lista filtrada para búsqueda
  searchTerm: string = ''; // Término de búsqueda

  constructor(private operadorService: OperadorService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Llama al servicio para obtener todos los operadores
    this.operadorService.getAll().subscribe({
      next: (data) => {
        this.operadores = data;
        this.filteredOperadores = data; // Inicializa la lista filtrada con todos los operadores
      },
      error: (err) => {
        console.error('Error al obtener los operadores:', err);
      }
    });
  }

  buscarOperadores(): void {
    // Filtra los operadores según el término de búsqueda
    this.filteredOperadores = this.operadores.filter(operador =>
      operador.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      operador.usuario.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteOperador(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este operador?')) {
      // Llama al servicio para eliminar el operador
      this.operadorService.delete(id).subscribe({
        next: () => {
          // Actualiza la lista filtrada eliminando el operador correspondiente
          this.filteredOperadores = this.filteredOperadores.filter(operador => operador.id !== id);
          // También actualiza la lista completa de operadores
          this.operadores = this.operadores.filter(operador => operador.id !== id);
          console.log(`Operador con ID ${id} eliminado correctamente.`);
          // Forzar la detección de cambios
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al eliminar el operador:', err);
        }
      });
    }
  }
}