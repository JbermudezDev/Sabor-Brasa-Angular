import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-operador',
  templateUrl: './listar-operador.component.html',
  styleUrls: ['./listar-operador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarOperadoresComponent implements OnInit {
  operador: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarOperador();
  }

  cargarOperador(): void {
    const operadorActual = this.authService.getClienteActual();
    if (!operadorActual || !operadorActual.id) {
      alert('Debe iniciar sesión para ver esta información.');
      this.router.navigate(['/login']);
      return;
    }

    this.operador = operadorActual;
    console.log('Operador cargado:', this.operador);
  }

  guardarCambios(): void {
    if (this.operador.id) {
      this.clienteService.updateCliente(this.operador.id, this.operador).subscribe({
        next: () => {
          alert('Datos actualizados con éxito.');
        },
        error: (err) => {
          console.error('Error al actualizar los datos del operador:', err);
          alert('No se pudieron guardar los cambios.');
        }
      });
    } else {
      alert('No se pudo identificar al operador.');
    }
  }
}