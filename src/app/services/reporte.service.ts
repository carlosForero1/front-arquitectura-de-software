import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Reporte
} from './modelos/reporte.modelo';

@Injectable({

  providedIn:
    'root'

})

export class ReporteService {

  private http =
    inject(
      HttpClient
    );

  private apiUrl =
    'http://localhost:8080/reportes';

  listarReportes():
    Observable<Reporte[]> {

    return this.http.get<Reporte[]>(

      `${this.apiUrl}/listar`

    );

  }

  crearReporte(
    data: any
  ): Observable<Reporte> {

    return this.http.post<Reporte>(

      `${this.apiUrl}/crear`,

      data

    );

  }

  editarReporte(

    id: number,

    data: any

  ): Observable<Reporte> {

    return this.http.put<Reporte>(

      `${this.apiUrl}/editar/${id}`,

      data

    );

  }

  eliminarReporte(
    id: number
  ): Observable<string> {

    return this.http.delete(

      `${this.apiUrl}/eliminar/${id}`,

      {

        responseType:
          'text'

      }

    );

  }

}