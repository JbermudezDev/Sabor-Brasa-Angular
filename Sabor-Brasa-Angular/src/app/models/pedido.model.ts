import { Cliente } from './cliente.model';
import { DetallePedido } from '../models/detalllepedido.model'; // Update the path to the correct location

export interface Pedido {
    id?: number;
    fechaCreacion: Date;
    fechaEntrega?: Date;
    estado: string;
    cliente: Cliente;
    detalles?: DetallePedido[];
  }