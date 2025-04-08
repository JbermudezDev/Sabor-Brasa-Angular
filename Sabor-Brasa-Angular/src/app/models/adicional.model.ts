import { Producto } from './producto.model';

export interface Adicional {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    productos?: Producto[];
  }
  
 