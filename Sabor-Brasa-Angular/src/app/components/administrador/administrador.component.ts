import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdministradorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verifica si ya se ha recargado para evitar bucle infinito
    const reloaded = sessionStorage.getItem('reloadedAdmin');
    if (!reloaded) {
      sessionStorage.setItem('reloadedAdmin', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadedAdmin');
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
