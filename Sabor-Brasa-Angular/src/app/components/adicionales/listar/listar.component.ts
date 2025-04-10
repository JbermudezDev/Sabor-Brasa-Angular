import { Component, OnInit } from '@angular/core';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-listar-adicionales',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarAdicionalComponent implements OnInit {

  adicionales: Adicional[] = [];  // Lista completa de adicionales
  filteredAdicionales: Adicional[] = [];  // Lista filtrada para búsqueda
  searchTerm: string = '';  // Término de búsqueda

  constructor(private adicionalService: AdicionalService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener todos los adicionales
    this.adicionalService.getAdicional().subscribe({
      next: (data) => {
        this.adicionales = data;
        this.filteredAdicionales = data;  // Inicializa la lista filtrada con todos los adicionales
      },
      error: (err) => {
        console.error('Error al obtener los adicionales:', err);
      }
    });
  }

  // Método para filtrar los adicionales según el término de búsqueda
  buscarAdicionales(): void {
    this.filteredAdicionales = this.adicionales.filter(adicional =>
      adicional.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      adicional.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Método para eliminar un adicional
  deleteAdicional(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este adicional?')) {
      // Llama al servicio para eliminar el adicional
      this.adicionalService.deleteById(id);
      // Actualiza la lista filtrada eliminando el adicional correspondiente
      this.filteredAdicionales = this.filteredAdicionales.filter(adicional => adicional.id !== id);
      // También actualiza la lista completa de adicionales
      this.adicionales = this.adicionales.filter(adicional => adicional.id !== id);
    }
  }
}