import { Component, OnInit } from '@angular/core';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-listar-adicionales',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarAdicionalesComponent implements OnInit {

  adicionales: Adicional[] = [];
  filteredAdicionales: Adicional[] = [];  // Lista filtrada
  searchTerm: string = '';  // Variable para el término de búsqueda

  constructor(private adicionalService: AdicionalService) {}

  ngOnInit(): void {
    this.getAdicionales();  // Carga los adicionales al iniciar
  }

  // Método para obtener todos los adicionales
  getAdicionales(): void {
    this.adicionalService.getAdicionales().subscribe(data => {
      this.adicionales = data;
      this.filteredAdicionales = data;  // Inicializa la lista filtrada con todos los adicionales
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
    this.adicionalService.deleteAdicional(id).subscribe(() => {
      this.getAdicionales();  // Refresca la lista después de eliminar
    });
  }
}
