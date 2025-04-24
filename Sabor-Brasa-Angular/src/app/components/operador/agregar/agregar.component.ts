import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/operador.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-agregar-operador',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarOperadorComponent {
  operador: Operador = {
    id: 0,
    nombre: '',
    usuario: '',
    contrasena: ''
  };

  constructor(private operadorService: OperadorService, private router: Router) {}

  onSubmit(): void {
    this.operadorService.add(this.operador).subscribe({
      next: (response) => {
        alert(response); // Muestra el mensaje del backend
        this.router.navigate(['/operadores']); // Redirige al listado de operadores
      },
      error: (err) => {
        console.error('Error al añadir el operador:', err);
        if (err.status === 400) {
          alert('Error: ' + err.error.error); // Mensaje del backend
        } else if (err.status === 500) {
          alert('Error interno del servidor. Inténtalo más tarde.');
        } else {
          alert('Error desconocido al añadir el operador.');
        }
      },
    });
  }
}