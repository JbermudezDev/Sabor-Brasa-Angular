import { Pedido } from './pedido.model';

export interface Operador {
  id?: number; 
  nombre: string;
  usuario: string; 
  contraseña: string; 
  pedidos?: Pedido[]; // Lista de pedidos asociados al operador
}