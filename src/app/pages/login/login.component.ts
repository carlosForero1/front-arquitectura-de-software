import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
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

    this.auth.login(this.usuario, this.password)
      .subscribe({

        next: (res) => {
          this.router.navigate(['/dashboard']);
          this.cargando = false;
        },

        error: (err) => {
          console.log(err);
          this.error = 'Credenciales incorrectas';
          this.cargando = false;
        }

      });

  }

}