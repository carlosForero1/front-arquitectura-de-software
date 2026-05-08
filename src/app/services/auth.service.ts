import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:8080/autenticacion';

  usuario = signal<any | null>(null);

  constructor(
    private http: HttpClient
  ) {

  }

  private esBrowser(): boolean {

    return typeof window !== 'undefined'
      && typeof localStorage !== 'undefined';
  }

  login(
    usuario: string,
    contrasena: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      {
        usuario,
        contrasena
      }
    ).pipe(

      tap((response: any) => {
        this.guardarSesion(response);

      })

    );
  }

  guardarSesion(data: any) {

    if(!this.esBrowser()) return;

    console.log(data)
    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'usuario',
      JSON.stringify(data)
    );

    this.usuario.set(data);
  }

  cargarSesion() {

    if(!this.esBrowser()) return;

    const usuario =
      localStorage.getItem('usuario');

    if(usuario){

      this.usuario.set(
        JSON.parse(usuario)
      );
    }
  }

  obtenerToken(): string | null {

    if(!this.esBrowser()) return null;

    return localStorage.getItem('token');
  }

  cerrarSesion() {

    if(!this.esBrowser()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.usuario.set(null);
  }

  estaAutenticado(): boolean {

    return !!this.obtenerToken();
  }

  obtenerModulos() {

    return this.usuario()?.menu?.modulos ?? [];
  }

  tienePermiso(
    permiso: string
  ): boolean {

    const modulos =
      this.obtenerModulos();

    return modulos.some(
      (modulo: any) =>
        modulo.permisos.includes(permiso)
    );
  }

  obtenerUsuario() {

    return this.usuario();
  }
}