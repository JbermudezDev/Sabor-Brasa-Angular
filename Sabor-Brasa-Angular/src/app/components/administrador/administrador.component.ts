import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { OperadorService } from 'src/app/services/operador.service';
import { DomiciliarioService } from 'src/app/services/domiciliario.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdministradorComponent implements OnInit, AfterViewInit {
  totalProductos = 0;
  totalClientes = 0;
  pedidosEnCurso = 0;
  ventasMensuales = 0;
  totalOperadores = 0;
  totalDomiciliarios = 0;
  pedidosRecientes: any[] = [];

  @ViewChild('ordersChartCanvas') ordersChartRef!: ElementRef;
  @ViewChild('revenueChartCanvas') revenueChartRef!: ElementRef;
  @ViewChild('productosChartCanvas') productosChartRef!: ElementRef;
  @ViewChild('estadosChartCanvas') estadosChartRef!: ElementRef;
  @ViewChild('operadoresChartCanvas') operadoresChartRef!: ElementRef;
  @ViewChild('domiciliariosChartCanvas') domiciliariosChartRef!: ElementRef;
  @ViewChild('clientesChartCanvas') clientesChartRef!: ElementRef;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private operadorService: OperadorService,
    private domiciliarioService: DomiciliarioService
  ) {}

  ngOnInit(): void {
    const reloaded = sessionStorage.getItem('reloadedDashboard');
    if (!reloaded) {
      sessionStorage.setItem('reloadedDashboard', 'true');
      window.location.reload();
      return;
    } else {
      sessionStorage.removeItem('reloadedDashboard');
    }

    this.productoService.getMenu().subscribe(data => {
      this.totalProductos = data.length;
    });

    this.clienteService.findAll().subscribe(data => {
      this.totalClientes = data.length;
    });

    this.pedidoService.listarTodos().subscribe(data => {
      this.pedidosEnCurso = data.filter(p =>
        ['RECIBIDO', 'COCINANDO', 'ENVIADO'].includes(p.estado)
      ).length;

      this.ventasMensuales = data.reduce((acc, p) => acc + p.total, 0);

      this.pedidosRecientes = data
        .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
        .slice(0, 5)
        .map(p => ({
          cliente: p.cliente?.nombre + ' ' + p.cliente?.apellido,
          productos: p.carrito?.productosSeleccionados?.map((i: any) => i.producto.nombre).join(', ') ?? '',
          fecha: new Date(p.fechaCreacion).toLocaleDateString(),
          estado: p.estado
        }));
    });

    this.operadorService.getAll().subscribe(data => {
      this.totalOperadores = data.length;
    });

    this.domiciliarioService.obtenerTodos().subscribe(data => {
      this.totalDomiciliarios = data.length;
    });
  }

  ngAfterViewInit(): void {
    this.cargarPedidosPorDia();
    this.cargarIngresosPorSemana();
    this.cargarProductosMasVendidos();
    this.cargarPedidosPorEstado();
    this.cargarPedidosPorOperador();
    this.cargarPedidosPorDomiciliario();
    this.cargarTopClientes();
  }

  cargarPedidosPorDia() {
    this.pedidoService.getPedidosPorDia().subscribe(data => {
      new Chart(this.ordersChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Órdenes por día',
            data: Object.values(data),
            backgroundColor: 'rgba(33, 150, 243, 0.7)',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { ticks: { stepSize: 1 } } }
        }
      });
    });
  }

  cargarIngresosPorSemana() {
    this.pedidoService.getIngresosPorSemana().subscribe(data => {
      new Chart(this.revenueChartRef.nativeElement, {
        type: 'line',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Ingresos por semana',
            data: Object.values(data),
            fill: true,
            tension: 0.4,
            backgroundColor: 'rgba(255, 167, 38, 0.3)',
            borderColor: '#ffa726'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: (context: any) => {
                  const value = Number(context.raw);
                  return 'Ingresos: ' + new Intl.NumberFormat('es-CO', {
                    style: 'currency', currency: 'COP', minimumFractionDigits: 0
                  }).format(value);
                }
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: function(value: number | string) {
                  const num = typeof value === 'string' ? parseFloat(value) : value;
                  return new Intl.NumberFormat('es-CO', {
                    style: 'currency', currency: 'COP', minimumFractionDigits: 0
                  }).format(num);
                }
              }
            }
          }
        }
      });
    });
  }

  cargarProductosMasVendidos() {
    this.pedidoService.getProductosMasVendidos().subscribe(data => {
      new Chart(this.productosChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Cantidad vendida',
            data: Object.values(data),
            backgroundColor: '#ab47bc'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    });
  }

  cargarPedidosPorEstado() {
    this.pedidoService.getPedidosPorEstado().subscribe(data => {
      new Chart(this.estadosChartRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Pedidos por estado',
            data: Object.values(data),
            backgroundColor: ['#ff7043', '#66bb6a', '#42a5f5', '#ffee58']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    });
  }

  cargarPedidosPorOperador() {
    this.pedidoService.getPedidosPorOperador().subscribe(data => {
      new Chart(this.operadoresChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Pedidos por Operador',
            data: Object.values(data),
            backgroundColor: '#42a5f5'
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    });
  }

  cargarPedidosPorDomiciliario() {
    this.pedidoService.getPedidosPorDomiciliario().subscribe(data => {
      new Chart(this.domiciliariosChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Pedidos por Domiciliario',
            data: Object.values(data),
            backgroundColor: '#ffa726'
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    });
  }

  cargarTopClientes() {
    this.pedidoService.getTopClientes().subscribe(data => {
      new Chart(this.clientesChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Top Clientes',
            data: Object.values(data),
            backgroundColor: '#66bb6a'
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    });
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'RECIBIDO': return 'badge-pending';
      case 'COCINANDO': return 'badge-cocinando';
      case 'ENVIADO': return 'badge-enviado';
      case 'ENTREGADO': return 'badge-complete';
      default: return '';
    }
  }

  getEstadoTexto(estado: string): string {
    switch (estado) {
      case 'RECIBIDO': return 'En curso';
      case 'COCINANDO': return 'Cocinando';
      case 'ENVIADO': return 'En camino';
      case 'ENTREGADO': return 'Entregado';
      default: return estado;
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
