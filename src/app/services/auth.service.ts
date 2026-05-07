import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/autenticacion';

  constructor(private http: HttpClient) {}

  login(usuario: string, contrasena: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/login`, {
      usuario: usuario,
      contrasena: contrasena
    });

  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}