import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListarComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  searchTerm: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // Refrescar solo una vez al cargar la página
    const reloaded = sessionStorage.getItem('reloadedListarClientes');
    if (!reloaded) {
      sessionStorage.setItem('reloadedListarClientes', 'true');
      window.location.reload();
      return;
    } else {
      sessionStorage.removeItem('reloadedListarClientes');
    }

    this.clienteService.findAll().subscribe({
      next: (data) => {
        this.clientes = data;
        this.filteredClientes = data;
      },
      error: (err) => {
        console.error('Error al obtener los clientes:', err);
      }
    });
  }

  buscarClientes(): void {
    this.filteredClientes = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.direccion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteCliente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clienteService.deleteById(id).subscribe({
        next: () => {
          console.log(`Cliente con ID ${id} eliminado correctamente.`);
          window.location.reload(); // Refresca inmediatamente después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar el cliente:', err);
        }
      });
    }
  }
}
