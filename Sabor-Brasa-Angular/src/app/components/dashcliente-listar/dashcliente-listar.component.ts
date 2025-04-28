import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashcliente-listar',
  templateUrl: './dashcliente-listar.component.html',
  styleUrls: ['./dashcliente-listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashclienteListarComponent implements OnInit {
  clienteNombre: string = 'Usuario'; // Valor predeterminado

  ngOnInit(): void {
    // Recupera el nombre del cliente desde localStorage
    const clienteActual = JSON.parse(localStorage.getItem('clienteActual') || '{}');
    this.clienteNombre = clienteActual.nombre || 'Usuario'; // Asigna el nombre o un valor predeterminado
  }
}