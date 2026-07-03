import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import { Usuario } from './modelos/Usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = "http://localhost:8080/usuario";

  constructor(
    private http: HttpClient
  ) { }

  /********************************************
   * LISTAR
   ********************************************/

  listar(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(

      `${this.apiUrl}/listar`

    );

  }


  /********************************************
   * BUSCAR POR NOMBRE
   ********************************************/

  buscarPorNombre(
    nombre: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/buscarPorNombre/${nombre}`

    );

  }


  /********************************************
   * BUSCAR POR PERFIL
   ********************************************/

  buscarPorPerfil(
    perfil: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/buscarPorPerfil/${perfil}`

    );

  }


  /********************************************
   * LISTAR ACTIVOS
   ********************************************/

  listarActivos(
    activo: boolean
  ): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(

      `${this.apiUrl}/listar/activo/${activo}`

    );

  }


  /********************************************
   * CREAR
   ********************************************/

  crear(
    usuario: Usuario
  ): Observable<Usuario> {

    return this.http.post<Usuario>(

      `${this.apiUrl}/crear`,

      usuario

    );

  }


  /********************************************
   * EDITAR
   ********************************************/

  editar(
    id: number,
    usuario: Usuario
  ): Observable<Usuario> {

    return this.http.put<Usuario>(

      `${this.apiUrl}/editarUsuario/${id}`,

      usuario

    );

  }


  /********************************************
   * ELIMINAR
   ********************************************/

  eliminar(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(

      `${this.apiUrl}/eliminarUsuario/${id}`

    );

  }


  /********************************************
   * CAMBIAR PERFIL
   ********************************************/

  editarPerfil(
    id: number,
    idPerfil: number
  ): Observable<Usuario> {

    return this.http.put<Usuario>(

      `${this.apiUrl}/editar/${id}/perfil/${idPerfil}`,

      {}

    );

  }


  /********************************************
   * CAMBIAR ESTADO
   ********************************************/

  cambiarEstado(
    id: number,
    estado: boolean
  ): Observable<Usuario> {

    return this.http.put<Usuario>(

      `${this.apiUrl}/usuarios/${id}/estado/${estado}`,

      {}

    );

  }


  /********************************************
   * ACTIVIDAD
   ********************************************/

  listarActividad(
    id: number
  ): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.apiUrl}/usuarios/${id}/actividad`

    );

  }

}