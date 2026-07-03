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
   * LISTA SIMPLE (DTO)
   ********************************************/
  listarPerfiles(): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.apiUrl}/listar`

    );

  }

  /********************************************
   * LISTA COMPLETA
   ********************************************/
  listarPerfilesCompletos(): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.apiUrl}/listarPerfiles`

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
   * CREAR PERFIL
   ********************************************/
  crearPerfil(
    perfil: any
  ): Observable<any> {

    return this.http.post<any>(

      this.apiUrl,

      perfil

    );

  }

  /********************************************
   * EDITAR PERFIL
   ********************************************/
  actualizarPerfil(
    id: number,
    perfil: any
  ): Observable<any> {

    return this.http.put<any>(

      `${this.apiUrl}/${id}`,

      perfil

    );

  }

  /********************************************
   * ACTUALIZAR PERMISOS
   ********************************************/
  actualizarPermisos(
    id: number,
    perfil: any
  ): Observable<any> {

    return this.http.put<any>(

      `${this.apiUrl}/${id}/permisos`,

      perfil

    );

  }

  /********************************************
   * ELIMINAR PERFIL
   ********************************************/
  eliminarPerfil(
    id: number
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`

    );

  }

}