import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  encapsulation: ViewEncapsulation.None 
})

export class DetalleComponent implements OnInit {
  @Input() producto: Producto | undefined;

  constructor(private router: Router, private productoService: ProductoService) {}

  ngOnInit(): void {}
}