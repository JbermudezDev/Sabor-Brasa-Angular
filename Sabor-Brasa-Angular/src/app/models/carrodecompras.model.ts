export interface CarroDeCompras {
    id: number;
    cliente: Cliente;
    detalles: DetallePedido[];
  }
  
  export interface Cliente {
    id: number;
    nombre: string;
  }
  
  export interface DetallePedido {
    id: number;
    cantidad: number;
    producto: string;
  }
  