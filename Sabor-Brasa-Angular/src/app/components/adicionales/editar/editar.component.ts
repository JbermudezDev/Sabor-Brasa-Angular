import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-editar-adicional',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditarAdicionalComponent implements OnInit {
  adicional: Adicional = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    productos: [] // Initialize with an empty array
  };

  constructor(
    private adicionalService: AdicionalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    this.adicionalService.findById(id).subscribe({
      next: (data) => {
        this.adicional = data; // Carga los datos del adicional en el formulario
      },
      error: (err) => {
        console.error('Error al obtener el adicional:', err);
      }
    });
  }

  onSubmit(): void {
    this.adicionalService.updateAdicional(this.adicional.id, this.adicional).subscribe({
      next: () => {
        this.router.navigate(['/adicionales/all']); // Redirige al listado de adicionales
      },
      error: (err) => {
        console.error('Error al actualizar el adicional:', err);
      }
    });
  }
}