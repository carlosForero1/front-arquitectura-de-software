import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReporteService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080';

  listarReportes(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/listar`
    );
  }

  crearReporte(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/crear`,
      data
    );
  }
}