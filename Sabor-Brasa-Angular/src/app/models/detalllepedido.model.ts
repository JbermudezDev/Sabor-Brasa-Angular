import { Pedido } from '../models/pedido.model'; // Adjusted path to match the correct location
import { Producto } from '../models/producto.model'; // Adjusted path to match the correct location

export interface DetallePedido {
    id: number;
    pedido: Pedido;
    producto: Producto;
    cantidad: number;
    precioUnitario: number;
  }
  