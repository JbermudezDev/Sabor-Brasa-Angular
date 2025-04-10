import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-detalle-adicional',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleAdicionalComponent implements OnInit {
  adicional: Adicional | undefined;

  constructor(
    private route: ActivatedRoute,
    private adicionalService: AdicionalService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID desde la URL
    this.adicionalService.getById(id).subscribe({
      next: (data) => {
        this.adicional = data; // Asigna los datos del adicional
      },
      error: (err) => {
        console.error('Error al obtener el adicional:', err);
      }
    });
  }
}