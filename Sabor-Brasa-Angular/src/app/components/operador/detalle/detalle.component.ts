import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/operador.model';

@Component({
  selector: 'app-detalle-operador',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleOperadorComponent implements OnInit {
  operador: Operador | undefined; // Detalle del operador

  constructor(
    private operadorService: OperadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    this.operadorService.getById(id).subscribe({
      next: (data) => {
        this.operador = data; // Carga los datos del operador
      },
      error: (err) => {
        console.error('Error al obtener el operador:', err);
      }
    });
  }
}