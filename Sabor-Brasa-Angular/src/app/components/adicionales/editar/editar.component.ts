import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-editar-adicional',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarAdicionalComponent implements OnInit {

  // Inicializar 'adicional' con valores predeterminados para evitar que sea 'undefined'
  adicional: Adicional = { id: 0, nombre: '', precio: 0, descripcion: '' };  

  constructor(
    private route: ActivatedRoute,
    private adicionalService: AdicionalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  // Obtén el ID desde la URL
    this.adicionalService.findById(id).subscribe({
      next: (data) => {
        this.adicional = data;  // Asigna los datos del adicional
      },
      error: (err) => {
        console.error('Error al obtener el adicional:', err);
      }
    });
  }

  // Método para actualizar el adicional
  updateAdicional(): void {
    if (this.adicional) {
      this.adicionalService.updateAdicional(this.adicional.id, this.adicional).subscribe({
        next: () => {
          this.router.navigate(['/adicionales/all']);  // Redirige al listado de adicionales después de actualizar
        },
        error: (err) => {
          console.error('Error al actualizar el adicional:', err);
        }
      });
    }
  }
}