import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashcliente-listar',
  templateUrl: './dashcliente-listar.component.html',
  styleUrls: ['./dashcliente-listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashclienteListarComponent implements OnInit {
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  @ViewChild('nombreInput') nombreInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const reloaded = sessionStorage.getItem('reloaded');
    if (!reloaded) {
      sessionStorage.setItem('reloaded', 'true');
      location.reload();
      return;
    }

    this.cargarCliente();

    // Resetear reload cuando se abandona la ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (!event.urlAfterRedirects.includes('/clientes/perfil')) {
          sessionStorage.removeItem('reloaded');
        }
      });

    // Darle foco al input
    setTimeout(() => {
      this.nombreInputRef?.nativeElement?.focus();
    }, 0);
  }

  cargarCliente(): void {
    const clienteActual = this.authService.getUsuario();
    if (!clienteActual || !clienteActual.id) {
      alert('Debe iniciar sesión para ver esta información.');
      this.router.navigate(['/login']);
      return;
    }

    this.cliente = clienteActual;

    this.clienteService.findById(clienteActual.id).subscribe({
      next: (data) => {
        this.cliente = data;
      },
      error: (err) => {
        console.error('Error al cargar los datos del cliente:', err);
        alert('No se pudieron cargar los datos del cliente.');
      }
    });
  }

  guardarCambios(): void {
    if (this.cliente.id) {
      this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe({
        next: () => {
          alert('Datos actualizados con éxito.');
          this.authService.guardarUsuario(this.cliente);
        },
        error: (err) => {
          console.error('Error al actualizar los datos del cliente:', err);
          alert('No se pudieron guardar los cambios.');
        }
      });
    } else {
      alert('No se pudo identificar al cliente.');
    }
  }

  // ✅ NUEVO: Método para cerrar sesión
  cerrarSesion(): void {
    this.authService.logout(); // limpia el token y notifica al backend
    localStorage.removeItem('clienteId');
    localStorage.removeItem('clienteActual');
    localStorage.removeItem('clienteData');
    localStorage.removeItem('carritoId');
    this.router.navigate(['/login']);
  }
}
