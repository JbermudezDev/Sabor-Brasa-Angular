import { Component, OnInit } from '@angular/core';
import { ComidaService } from 'src/app/services/comida.service';
import { Comida } from 'src/app/models/comida.model';

@Component({
  selector: 'app-comida-list',
  templateUrl: './comida-list.component.html',
  styleUrls: ['./comida-list.component.css']
})
export class ComidaListComponent implements OnInit {
  comidas: Comida[] = [];

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.comidas = this.comidaService.getAll();
  }

  eliminarComida(id: number): void {
    this.comidaService.delete(id);
    this.comidas = this.comidaService.getAll(); // Recargar lista
  }
}
