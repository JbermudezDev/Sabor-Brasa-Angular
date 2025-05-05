export interface SeleccionarProducto {
    id: number;
    cantidad: number;
    carrito: CarritoCompras;
    producto: Producto;
    adicionales: Adicional[];
  }
  
  export interface CarritoCompras {
    id: number;
    clienteId: number;
    total: number;
    productosSeleccionados: SeleccionarProducto[];
  }
  
  export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
  }
  
  export interface Adicional {
    id: number;
    nombre: string;
    precio: number;
  }