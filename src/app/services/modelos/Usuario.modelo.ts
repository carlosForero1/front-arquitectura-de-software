export interface  Usuario {
  id: number;
  nombre: string;
  correo: string;
  usuario: string;
  perfilId:number;
  perfilNombre:string;
  activo:boolean;
  equipo:string;
  ultimaConexion:string;
  estado: boolean;
}