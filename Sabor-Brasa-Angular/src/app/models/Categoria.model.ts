export interface CarroDeCompras {
    id?: number;
    clienteId: number;
    detalles: DetallePedido[];
  }
  
  export interface DetallePedido {
    id?: number;
    productoId: number;
    cantidad: number;
    precio: number;
  }
  
  export enum Categoria {
    ENTRADA = 'ENTRADA',
    PLATO_FUERTE = 'PLATO_FUERTE',
    POSTRE = 'POSTRE',
    BEBIDA = 'BEBIDA',
    ADICIONAL = 'ADICIONAL'
  }