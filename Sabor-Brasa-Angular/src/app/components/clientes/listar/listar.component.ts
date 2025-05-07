import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/carrodecompras.model';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  clientes: Cliente[] = []; // Lista completa de clientes
  filteredClientes: Cliente[] = []; // Lista filtrada para búsqueda
  searchTerm: string = ''; // Término de búsqueda

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener todos los clientes
    this.clienteService.findAll().subscribe({
      next: (data) => {
        this.clientes = data;
        this.filteredClientes = data; // Inicializa la lista filtrada con todos los clientes
      },
      error: (err) => {
        console.error('Error al obtener los clientes:', err);
      }
    });
  }

  buscarClientes(): void {
    // Filtra los clientes según el término de búsqueda
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
      // Llama al servicio para eliminar el cliente
      this.clienteService.deleteById(id).subscribe({
        next: () => {
          // Actualiza la lista filtrada eliminando el cliente correspondiente
          this.filteredClientes = this.filteredClientes.filter(cliente => cliente.id !== id);
          // También actualiza la lista completa de clientes
          this.clientes = this.clientes.filter(cliente => cliente.id !== id);
          console.log(`Cliente con ID ${id} eliminado correctamente.`);
        },
        error: (err) => {
          console.error('Error al eliminar el cliente:', err);
        }
      });
    }
  }
}
