import { Categoria } from './categoria.model';
import { Adicional } from './adicional.model'; // Ensure this path is correct

export interface Producto {
    id?: number;
    nombre: string;
    precio: number;
    descripcion?: string;
    imagen?: string;
    categoria: Categoria;
    adicionales?: Adicional[];
  }

  export enum CategoriaType {
    ENTRADA = 'ENTRADA',
    PRINCIPAL = 'PRINCIPAL',
    POSTRE = 'POSTRE',
    BEBIDA = 'BEBIDA'
  }