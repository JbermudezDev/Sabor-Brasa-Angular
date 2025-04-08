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

  adicional: Adicional = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    productos: []  // Inicializa como un array vacío
  };

  constructor(
    private route: ActivatedRoute,
    private adicionalService: AdicionalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adicionalService.getAdicional(id).subscribe(data => {
      this.adicional = data;  // Obtiene los datos del adicional a editar
    });
  }

  // Método para actualizar el adicional
  updateAdicional(): void {
    this.adicionalService.updateAdicional(this.adicional.id, this.adicional).subscribe(() => {
      this.router.navigate(['/adicionales/all']);  // Redirige al listado de adicionales después de editar
    });
  }
}
