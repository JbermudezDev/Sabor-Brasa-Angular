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