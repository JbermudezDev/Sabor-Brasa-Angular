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
  adicional: Adicional | undefined; // Variable para almacenar el adicional

  constructor(
    private route: ActivatedRoute,
    private adicionalService: AdicionalService
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del adicional desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Llama al servicio para obtener los detalles del adicional
    this.adicionalService.getAdicionalById(id).subscribe({
      next: (data) => {
        this.adicional = data; // Asigna los datos del adicional
      },
      error: (err) => {
        console.error('Error al obtener el adicional:', err);
        alert('Error al obtener el adicional. Intente nuevamente más tarde.');
      }
    });
  }
}