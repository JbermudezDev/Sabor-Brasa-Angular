import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-agregar-adicional',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarAdicionalComponent {
  adicional: Adicional = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: ''
  };

  constructor(
    private adicionalService: AdicionalService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.adicionalService.createAdicional(this.adicional).subscribe({
      next: () => {
        console.log('Adicional agregado correctamente');
        this.router.navigate(['/adicionales/all']); // Redirige al listado de adicionales
      },
      error: (err) => {
        console.error('Error al agregar el adicional:', err);
        alert('Ocurrió un error al agregar el adicional. Intente nuevamente.');
      }
    });
  }
}