import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdministradorComponent {
  constructor(private router: Router) {}

  // Método para navegar a una ruta específica
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}