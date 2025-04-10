import { Component, OnInit } from '@angular/core';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-adicional',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarAdicionalComponent implements OnInit {

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

  ngOnInit(): void {}

  // Método para agregar el adicional
  addAdicional(): void {
    this.adicionalService.addAdicional(this.adicional);
    this.router.navigate(['/adicionales/all']);  // Redirige al listado de adicionales después de agregar
  }
}