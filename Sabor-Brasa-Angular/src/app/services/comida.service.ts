import { Injectable } from '@angular/core';
import { Comida } from '../models/comida.model';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private comidas: Comida[] = [
    {
      id: 1,
      nombre: 'Costillas BBQ',
      descripcion: 'Jugosas costillas con salsa BBQ',
      precio: 39000,
      imagen: 'assets/images/costillasmain.jpeg'
    },
    {
      id: 2,
      nombre: 'Tomahawk',
      descripcion: 'Corte premium para los más exigentes',
      precio: 98000,
      imagen: 'assets/images/tomahawkmain.jpeg'
    }
  ];

  getAll(): Comida[] {
    return this.comidas;
  }

  getById(id: number): Comida | undefined {
    return this.comidas.find(c => c.id === id);
  }

  add(comida: Comida): void {
    comida.id = this.comidas.length + 1;
    this.comidas.push(comida);
  }

  update(comida: Comida): void {
    const index = this.comidas.findIndex(c => c.id === comida.id);
    if (index !== -1) {
      this.comidas[index] = comida;
    }
  }

  delete(id: number): void {
    this.comidas = this.comidas.filter(c => c.id !== id);
  }
}
