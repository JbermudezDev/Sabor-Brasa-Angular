export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password?: string; // Opcional en la actualización
    telefono: string;
    direccion: string;
  }
  