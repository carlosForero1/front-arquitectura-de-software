export interface UsuarioRegistro {

  id?: number;

  nombre: string;

  cargo: string;

  correo: string;

  usuario: string;

  contrasena: string;

  activo?: boolean;

  equipo?: string;

perfilId: number | null;
}