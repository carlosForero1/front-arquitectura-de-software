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
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { PerfilService } from '../../services/perfil.service';

import { Usuario } from '../../services/modelos/Usuario.modelo';

declare var bootstrap: any;

@Component({

  selector: 'app-usuario',

  standalone: true,

  imports: [

    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ],

  templateUrl: './usuario.component.html',

  styleUrl: './usuario.component.scss'

})

export class UsuarioComponent implements OnInit {

  /********************************************
   * TABLAS
   ********************************************/

  usuarios: Usuario[] = [];

  usuariosFiltrados: Usuario[] = [];

  perfiles: any[] = [];

  actividades: any[] = [];

  permisos: any = {};


  /********************************************
   * FORMULARIOS
   ********************************************/

  formulario!: FormGroup;


  /********************************************
   * OBJETOS
   ********************************************/

  usuarioSeleccionado: Usuario | null = null;


  /********************************************
   * VARIABLES
   ********************************************/

  idEditar = 0;

  nuevoPerfil: number | null = null;

  buscarTexto = '';

  perfilSeleccionado = '';

  estadoSeleccionado: any = '';



  /********************************************
   * CONSTRUCTOR
   ********************************************/

  constructor(

    private usuarioService: UsuarioService,

    private perfilService: PerfilService,

    private fb: FormBuilder,

    private cdr: ChangeDetectorRef

  ) {

  }



  /********************************************
   * INIT
   ********************************************/

  ngOnInit(): void {

    this.formulario = this.fb.group({

      nombre: [''],

      cargo: [''],

      correo: [''],

      usuario: [''],

      perfilId: [null]

    });

    this.cargarUsuarios();

    this.cargarPerfiles();

  }



  /********************************************
   * USUARIOS
   ********************************************/

  cargarUsuarios(): void {

    this.usuarioService
      .listar()
      .subscribe({

        next: (respuesta) => {

          this.usuarios = respuesta;

          this.usuariosFiltrados = [...respuesta];

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(

            'Error cargando usuarios',

            error

          );

        }

      });

  }



  /********************************************
   * PERFILES
   ********************************************/

  cargarPerfiles(): void {

    this.perfilService
      .listarPerfiles()
      .subscribe({

        next: (respuesta) => {

          this.perfiles = respuesta;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(

            'Error cargando perfiles',

            error

          );

        }

      });

  }

  /********************************************
 * FILTROS
 ********************************************/

filtrarUsuarios(): void {

  this.usuariosFiltrados = this.usuarios.filter(usuario => {

    const coincideTexto =

      this.buscarTexto === '' ||

      usuario.nombre?.toLowerCase().includes(this.buscarTexto.toLowerCase()) ||

      usuario.usuario?.toLowerCase().includes(this.buscarTexto.toLowerCase());

    const coincidePerfil =

      this.perfilSeleccionado === '' ||

      usuario.perfilNombre === this.perfilSeleccionado;

    const coincideEstado =


      this.estadoSeleccionado === '' ||

      usuario.estado == this.estadoSeleccionado;
    return (

      coincideTexto &&
      coincidePerfil &&
      coincideEstado

    );

  });

}


/********************************************
 * MODAL CREAR
 ********************************************/

abrirModalCrear(): void {

  this.idEditar = 0;

  this.formulario.reset();

  this.formulario.patchValue({

    perfilId: null

  });

  const modal = new bootstrap.Modal(

    document.getElementById("modalUsuario")

  );

  modal.show();

}


/********************************************
 * MODAL EDITAR
 ********************************************/

editar(usuario: Usuario): void {

  this.idEditar = usuario.id;

  this.usuarioSeleccionado = usuario;

  this.formulario.patchValue({

    nombre: usuario.nombre,

    cargo: usuario.cargo,

    correo: usuario.correo,

    usuario: usuario.usuario,

    perfilId: (usuario as any).perfilId

  });

  const modal = new bootstrap.Modal(

    document.getElementById("modalUsuario")

  );

  modal.show();

}


/********************************************
 * MODAL VER
 ********************************************/

verUsuario(usuario: Usuario): void {

  this.usuarioSeleccionado = usuario;

  const modal = new bootstrap.Modal(

    document.getElementById("modalVer")

  );

  modal.show();

}


/********************************************
 * CREAR / EDITAR
 ********************************************/

guardar(): void {

  const datos = this.formulario.value;

  if (this.idEditar == 0) {

    this.usuarioService

      .crear(datos)

      .subscribe({

        next: () => {

          this.cerrarModalUsuario();

          this.cargarUsuarios();

        },

        error: error => {

          console.error(

            "Error creando usuario",

            error

          );

        }

      });

  }

  else {

    this.usuarioService

      .editar(

        this.idEditar,

        datos

      )

      .subscribe({

        next: () => {

          this.cerrarModalUsuario();

          this.cargarUsuarios();

        },

        error: error => {

          console.error(

            "Error editando usuario",

            error

          );

        }

      });

  }

}


/********************************************
 * ELIMINAR
 ********************************************/

eliminar(id: number): void {

  const confirmar = confirm(

    "¿Desea eliminar este usuario?"

  );

  if (!confirmar) {

    return;

  }

  this.usuarioService

    .eliminar(id)

    .subscribe({

      next: () => {

        this.cargarUsuarios();

      },

      error: error => {

        console.error(

          "Error eliminando usuario",

          error

        );

      }

    });

}


/********************************************
 * CERRAR MODAL
 ********************************************/

cerrarModalUsuario(): void {

  this.formulario.reset();

  bootstrap.Modal

    .getInstance(

      document.getElementById("modalUsuario")

    )

    ?.hide();

}
/********************************************
 * CAMBIAR PERFIL
 ********************************************/

abrirModalPerfil(usuario: Usuario): void {

  this.usuarioSeleccionado = usuario;

  this.nuevoPerfil = (usuario as any).perfilId;

  const modal = new bootstrap.Modal(

    document.getElementById("modalPerfil")

  );

  modal.show();

}


guardarPerfil(): void {

  if (this.usuarioSeleccionado == null) {
    return;
  }

  if (this.nuevoPerfil == null) {
    return;
  }

  this.usuarioService

    .editarPerfil(

      this.usuarioSeleccionado.id,

      this.nuevoPerfil

    )

    .subscribe({

      next: () => {

        this.cerrarModalPerfil();

        this.cargarUsuarios();

      },

      error: error => {

        console.error(

          "Error cambiando perfil",

          error

        );

      }

    });

}


/********************************************
 * CAMBIAR ESTADO
 ********************************************/

cambiarEstado(usuario: Usuario): void {

  const nuevoEstado = !usuario.activo;

  this.usuarioService

    .cambiarEstado(

      usuario.id,

      nuevoEstado

    )

    .subscribe({

      next: () => {

        this.cargarUsuarios();

      },

      error: error => {

        console.error(

          "Error cambiando estado",

          error

        );

      }

    });

}


/********************************************
 * VER PERMISOS
 ********************************************/

verPermisos(usuario: Usuario): void {

  this.usuarioSeleccionado = usuario;

  this.perfilService

    .consultarPermisos(

      (usuario as any).perfilId

    )

    .subscribe({

      next: (respuesta: any) => {

        this.permisos = respuesta;

        const modal = new bootstrap.Modal(

          document.getElementById("modalPermisos")

        );

        modal.show();

      },

      error: error => {

        console.error(

          "Error consultando permisos",

          error

        );

      }

    });

}


/********************************************
 * VER ACTIVIDAD
 ********************************************/

verActividad(usuario: Usuario): void {

  this.usuarioSeleccionado = usuario;

  this.usuarioService

    .listarActividad(

      usuario.id

    )

    .subscribe({

      next: respuesta => {

        this.actividades = respuesta;

        const modal = new bootstrap.Modal(

          document.getElementById("modalActividad")

        );

        modal.show();

      },

      error: error => {

        console.error(

          "Error obteniendo actividad",

          error

        );

      }

    });

}


/********************************************
 * CERRAR MODALES
 ********************************************/

cerrarModalPerfil(): void {

  bootstrap.Modal

    .getInstance(

      document.getElementById("modalPerfil")

    )

    ?.hide();

}


cerrarModalPermisos(): void {

  bootstrap.Modal

    .getInstance(

      document.getElementById("modalPermisos")

    )

    ?.hide();

}


cerrarModalActividad(): void {

  bootstrap.Modal

    .getInstance(

      document.getElementById("modalActividad")

    )

    ?.hide();

}


/********************************************
 * MÉTODOS AUXILIARES
 ********************************************/

recargar(): void {

  this.cargarUsuarios();

}


limpiarFiltros(): void {

  this.buscarTexto = '';

  this.perfilSeleccionado = '';

  this.estadoSeleccionado = '';

  this.usuariosFiltrados = [...this.usuarios];

}


obtenerBadgeEstado(activo: boolean): string {

  return activo

    ? 'bg-success'

    : 'bg-danger';

}


obtenerTextoEstado(activo: boolean): string {

  return activo

    ? 'Activo'

    : 'Inactivo';

}

}
