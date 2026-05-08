import { Component }
from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './login.component.html',

  styleUrl: './login.component.scss'
})

export class LoginComponent {

  usuario = '';
  password = '';

  error = '';
  cargando = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    this.cargando = true;

    this.error = '';

    this.auth.login(
      this.usuario,
      this.password
    ).subscribe({

      next: () => {

        this.router.navigate([
          '/dashboard/reportes'
        ]);

        this.cargando = false;
      },

      error: (err) => {

        console.log(err);

        this.error =
          'Credenciales incorrectas';

        this.cargando = false;
      }

    });
  }
}