import { Cliente } from './carrodecompras.model';
import { SeleccionarProducto } from './seleccionarproducto';
import { Domiciliario } from './domiciliario.model';
import { Operador } from './operador.model';

export interface Pedido {
  id: number;
  cliente: Cliente;
  fechaCreacion: Date;
  fechaEntrega?: Date;
  estado: 'RECIBIDO' | 'COCINANDO' | 'ENVIADO' | 'ENTREGADO';  // Enum implícito
  total: number;
  carrito: {
    id: number;
    productosSeleccionados: SeleccionarProducto[];
  };
  operador?: Operador;
  domiciliario?: Domiciliario;
}
