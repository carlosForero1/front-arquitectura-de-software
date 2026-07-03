import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { PerfilService } from '../../services/perfil.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  perfiles: any[] = [];

  cargando = false;

  error = '';

  mensaje = '';

  usuario = {

    nombre: '',

    cargo: '',

    correo: '',

    usuario: '',

    contrasena: '',

    perfilId: null

  };

  constructor(

    private usuarioService: UsuarioService,

    private perfilService: PerfilService,

    private router: Router,

    private authService: AuthService

  ) { }

  ngOnInit(): void {

    this.listarPerfiles();

  }

  listarPerfiles(): void {

    this.perfilService

      .listarPerfiles()

      .subscribe({

        next: (data) => {

          this.perfiles = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  registrar(): void {

    this.error = '';

    this.mensaje = '';

    if (

      this.usuario.nombre.trim() === '' ||

      this.usuario.cargo.trim() === '' ||

      this.usuario.correo.trim() === '' ||

      this.usuario.usuario.trim() === '' ||

      this.usuario.contrasena.trim() === '' ||

      this.usuario.perfilId == null

    ) {

      this.error = "Debe completar todos los campos.";

      return;

    }

    this.cargando = true;

   this.authService

  .registroUsuario(this.usuario)

  .subscribe({

    next: (respuesta) => {

      console.log(respuesta);

    },

    error: (error) => {

      console.error(error);

    }

  });


  }

}