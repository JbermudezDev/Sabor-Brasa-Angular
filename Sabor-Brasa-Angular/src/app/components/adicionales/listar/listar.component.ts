import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-listar-adicionales',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarAdicionalComponent implements OnInit {
  adicionales: Adicional[] = []; // Lista completa de adicionales
  filteredAdicionales: Adicional[] = []; // Lista filtrada para búsqueda
  searchTerm: string = ''; // Término de búsqueda

  constructor(private adicionalService: AdicionalService) {}

  ngOnInit(): void {
    this.getAdicionales(); // Carga los adicionales al inicializar el componente
  }

  getAdicionales(): void {
    this.adicionalService.getAdicionales().subscribe({
      next: (data) => {
        this.adicionales = data; // Asigna los adicionales obtenidos
        this.filteredAdicionales = data; // Inicializa la lista filtrada
      },
      error: (err) => {
        console.error('Error al obtener los adicionales:', err);
      }
    });
  }

  buscarAdicionales(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAdicionales = this.adicionales.filter(adicional =>
      adicional.nombre.toLowerCase().includes(term)
    );
  }

  deleteAdicional(id: number): void {
    console.log('Intentando eliminar adicional con ID:', id);
  
    if (confirm('¿Estás seguro de que deseas eliminar este adicional?')) {
      this.adicionalService.deleteAdicional(id).subscribe({
        next: () => {
          // Actualiza las listas eliminando el adicional correspondiente
          this.adicionales = this.adicionales.filter(a => a.id !== id);
          this.filteredAdicionales = this.filteredAdicionales.filter(a => a.id !== id);
          alert('Adicional eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el adicional:', err);
  
          // Manejo de errores basado en el código de estado HTTP
          if (err.status === 404) {
            alert('El adicional no existe o ya fue eliminado.');
          } else if (err.status === 500) {
            alert('Error interno del servidor. Intente nuevamente más tarde.');
          } else {
            alert('Ocurrió un error al intentar eliminar el adicional.');
          }
        }
      });
    }
  }
  }
