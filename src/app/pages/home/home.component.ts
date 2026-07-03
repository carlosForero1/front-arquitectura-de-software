import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../services/modelos/Usuario.modelo';
import { PerfilService } from '../../services/perfil.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  usuarios: Usuario[] = [];

  perfiles: any[] = [];

  formulario!: FormGroup;

  usuarioSeleccionado: Usuario | null = null;

  idEditar = 0;

  constructor(
    private usuarioService: UsuarioService,
    private perfilServicio: PerfilService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group({

      nombre: [''],
      cargo: [''],
      correo: [''],
      usuario: [''],
      perfilId: [null]

    });

    this.listarUsuarios();
    this.listarPerfiles();

  }

  listarUsuarios(): void {

    this.usuarioService
      .listar()
      .subscribe({

        next: (data) => {

          this.usuarios = data;
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(
            'Error listando usuarios',
            err
          );

        }

      });

  }

  listarPerfiles(): void {

    this.perfilServicio
      .listarPerfiles()
      .subscribe({

        next: (data) => {

          this.perfiles = data;
            this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(
            'Error listando perfiles',
            err
          );

        }

      });

  }

  abrirModalCrear(): void {

    this.idEditar = 0;

    this.formulario.reset();

    this.formulario.patchValue({
      perfilId: null
    });

    const modal =
      new bootstrap.Modal(
        document.getElementById('modalUsuario')
      );

    modal.show();

  }

  editar(usuario: Usuario): void {

    this.idEditar = usuario.id;

    this.formulario.patchValue({

      nombre: usuario.nombre,
      cargo: usuario.cargo,
      correo: usuario.correo,
      usuario: usuario.usuario,
      perfilId: (usuario as any).perfilId

    });

    const modal =
      new bootstrap.Modal(
        document.getElementById('modalUsuario')
      );

    modal.show();

  }

  verUsuario(usuario: Usuario): void {

    this.usuarioSeleccionado = usuario;

    const modal =
      new bootstrap.Modal(
        document.getElementById('modalVer')
      );

    modal.show();

  }

  guardar(): void {

    const datos = this.formulario.value;

    if (this.idEditar === 0) {

      this.usuarioService
        .crear(datos)
        .subscribe({

          next: () => {

            this.listarUsuarios();

            bootstrap.Modal
              .getInstance(
                document.getElementById('modalUsuario')
              )
              ?.hide();

            this.formulario.reset();

          },

          error: (err) => {

            console.error(
              'Error creando usuario',
              err
            );

          }

        });

    } else {

      this.usuarioService
        .editar(
          this.idEditar,
          datos
        )
        .subscribe({

          next: () => {

            this.listarUsuarios();

            bootstrap.Modal
              .getInstance(
                document.getElementById('modalUsuario')
              )
              ?.hide();

          },

          error: (err) => {

            console.error(
              'Error editando usuario',
              err
            );

          }

        });

    }

  }

  eliminar(id: number): void {

    const confirmar =
      confirm(
        '¿Desea eliminar este usuario?'
      );

    if (!confirmar) {
      return;
    }

    this.usuarioService
      .eliminar(id)
      .subscribe({

        next: () => {

          this.usuarios =
            this.usuarios.filter(
              usuario => usuario.id !== id
            );

        },

        error: (err) => {

          console.error(
            'Error eliminando usuario',
            err
          );

        }

      });

  }

}