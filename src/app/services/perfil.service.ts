import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './modelos/Usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:8080/perfil';

  constructor(
    private http: HttpClient
  ) {}

 listarPerfiles() {
  return this.http.get<any[]>(
    `${this.apiUrl}/listar`
  );
}
}