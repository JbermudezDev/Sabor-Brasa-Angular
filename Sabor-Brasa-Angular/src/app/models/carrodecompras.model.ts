export interface CarroDeCompras {
    id: number;
    cliente: Cliente;
    detalles: DetallePedido[];
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
  