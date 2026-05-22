export interface Reporte {

  id: number;

  tipo: string;

  descripcion: string;

  recomendacionAgente: string;

  pasosAgente: string;

  accionesPreAgente: string;

  activo: boolean;

  solucionado: boolean;

  tiempoCrea: Date;
}