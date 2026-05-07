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

  email = '';
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

    this.auth.login(this.email, this.password)
      .subscribe({

        next: (res) => {
          this.auth.guardarToken(res.token);

          // guardar datos usuario
          localStorage.setItem('usuario', res.usuario);
          localStorage.setItem('nombre', res.nombre);
          localStorage.setItem('cargo', res.cargo);
          localStorage.setItem('correo', res.correo);

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