import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = "http://localhost:8080/perfil";

  constructor(
    private http: HttpClient
  ) { }

  /********************************************
   * LISTAR PERFILES
   ********************************************/

  listarPerfiles(): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.apiUrl}/listar`

    );

  }


  /********************************************
   * CONSULTAR PERFIL POR ID
   ********************************************/

  obtenerPerfil(
    id: number
  ): Observable<any> {

    return this.http.get<any>(

      `${this.apiUrl}/${id}`

    );

  }


  /********************************************
   * CONSULTAR PERMISOS
   ********************************************/

  consultarPermisos(
    idPerfil: number
  ): Observable<any> {

    return this.http.get<any>(

      `${this.apiUrl}/${idPerfil}/permisos`

    );

  }

}