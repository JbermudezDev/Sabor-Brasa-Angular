import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';
import { Cliente } from 'src/app/models/carrodecompras.model';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: any[] = [];
  cliente!: Cliente;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const clienteActual = this.authService.getClienteActual();
    if (!clienteActual || !clienteActual.id) {
      alert('Debe iniciar sesión para ver sus pedidos');
      return;
    }
  
    this.http.get<any[]>(`http://localhost:8090/pedidos/cliente/${clienteActual.id}`).subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log('Pedidos cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        alert('No se pudieron cargar los pedidos');
      }
    });
  }
  

  getTotalPedido(pedido: any): number {
    if (!pedido.carrito || !pedido.carrito.productosSeleccionados) {
      return 0;
    }

    return pedido.carrito.productosSeleccionados.reduce(
      (sum: number, item: any) => {
        const adicionalesSum = item.adicionales ? item.adicionales.reduce((a: number, b: any) => a + b.precio, 0) : 0;
        return sum + (item.producto?.precio ?? 0) + adicionalesSum;
      },
      0
    );
  }
}
