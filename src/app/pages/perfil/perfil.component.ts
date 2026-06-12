import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {

  perfilesModulos: any[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.listar();

  }

  listar(): void {

    this.http
      .get<any[]>(
        'http://localhost:8080/perfil/modulo/listar'
      )
      .subscribe({

        next: (data) => {

          this.perfilesModulos = data;

          console.log(data);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}