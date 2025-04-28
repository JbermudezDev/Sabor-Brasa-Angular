import { Producto } from './producto.model';
import { Adicional } from './adicional.model';

export interface ItemCarrito {
  producto: Producto;
  adicionales: Adicional[];
  total: number;
}
  
  export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password?: string; // Opcional en la actualización
    telefono: string;
    direccion: string;
  }
  
  export interface DetallePedido {
    id: number;
    cantidad: number;
    producto: string;
  }
