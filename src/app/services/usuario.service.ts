import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './modelos/Usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuario';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${this.apiUrl}/listar`
    );
  }

  buscarPorNombre(nombre: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/buscarPorNombre/${nombre}`
    );
  }

  editar(
    id: number,
    usuario: Usuario
  ): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiUrl}/editarUsuario/${id}`,
      usuario
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/eliminarUsuario/${id}`
    );
  }

  crear(
      data: any
    ): Observable<Usuario> {
  
      console.log(data)
      return this.http.post<Usuario>(
  
        `${this.apiUrl}/crear`,
  
        data
  
      );
  
    }
}