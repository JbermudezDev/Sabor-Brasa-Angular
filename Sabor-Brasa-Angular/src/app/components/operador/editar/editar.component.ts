import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/operador.model';

@Component({
  selector: 'app-editar-operador',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditarOperadorComponent implements OnInit {
  operador: Operador = {
    id: 0,
    nombre: '',
    usuario: '',
    contrasena: ''
  };

  constructor(
    private operadorService: OperadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    this.operadorService.getById(id).subscribe({
      next: (data) => {
        this.operador = data; // Carga los datos del operador en el formulario
      },
      error: (err) => {
        console.error('Error al obtener el operador:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.operador.id) {
      this.operadorService.update(this.operador.id, this.operador).subscribe({
        next: () => {
          console.log('Operador actualizado correctamente');
          this.router.navigate(['/operadores']); // Redirige al listado de operadores
        },
        error: (err) => {
          console.error('Error al actualizar el operador:', err);
          alert('Ocurrió un error al actualizar el operador. Por favor, inténtelo nuevamente.');
        }
      });
    }
  }
}