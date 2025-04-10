import { Categoria } from './categoria.model';
import { Adicional } from './adicional.model'; // Ensure this path is correct

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  adicionales?: {
    seleccionado: boolean; id: number; nombre: string 
}[]; // Si el producto tiene adicionales
}