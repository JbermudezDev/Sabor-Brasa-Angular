import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-agregar-adicional',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarAdicionalComponent {
  adicional: Adicional = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    productos: []
  };

  constructor(private adicionalService: AdicionalService, private router: Router) {}

  // Método para agregar un adicional
  addAdicional(): void {
    this.adicionalService.addAdicional(this.adicional).subscribe(() => {
      this.router.navigate(['/adicionales/all']);  // Redirige al listado de adicionales
    });
  }
}

