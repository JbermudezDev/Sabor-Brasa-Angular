import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionalService } from 'src/app/services/adicional.service';
import { Adicional } from 'src/app/models/adicional.model';

@Component({
  selector: 'app-detalle-adicional',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleAdicionalComponent implements OnInit {

  adicional: Adicional | null = null;

  constructor(private route: ActivatedRoute, private adicionalService: AdicionalService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adicionalService.getAdicional(id).subscribe(data => {
      this.adicional = data;  // Obtiene los detalles del adicional
    });
  }

  backToList(): void {
    this.router.navigate(['/adicionales/all']);  // Redirige al listado de adicionales
  }
}
