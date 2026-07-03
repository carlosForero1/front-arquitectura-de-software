import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import { PerfilService } from '../../services/perfil.service';

declare var bootstrap: any;

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {

  perfiles: any[] = [];

  perfilSeleccionado: any = null;

  busqueda: string = '';

  idEditar = 0;

  perfil: any = {

    nombre: '',

    permisosManejo: {

      activo: true,

      usoUSB: false,
      dispositivosExternos: false,
      clonado: false,
      clonadoMasivo: false,

      permisoDescargas: false,
      usoInternet: false,
      redesSociales: false,
      streaming: false,
      sitiosNoSeguros: false,

      usoCmd: false,
      powerShell: false,

      analisisVirusSimple: false,
      analisisVirusCompleto: false

    }

  };

  constructor(

    private perfilService: PerfilService,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.cargarPerfiles();

  }

  cargarPerfiles(): void {

    this.perfilService
      .listarPerfiles()
      .subscribe({

        next: (data) => {

          this.perfiles = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(
            'Error cargando perfiles',
            err
          );

        }

      });

  }
  // ================================
// BUSCADOR
// ================================

perfilesFiltrados(): any[] {

  if (!this.busqueda) {
    return this.perfiles;
  }

  return this.perfiles.filter(perfil =>

    perfil.nombre
      .toLowerCase()
      .includes(this.busqueda.toLowerCase())

  );

}

// ================================
// MODAL CREAR
// ================================

abrirCrearPerfil(): void {

  this.idEditar = 0;

  this.perfil = {

    nombre: '',

    permisosManejo: {

      activo: true,

      usoUSB: false,
      dispositivosExternos: false,
      clonado: false,
      clonadoMasivo: false,

      permisoDescargas: false,
      usoInternet: false,
      redesSociales: false,
      streaming: false,
      sitiosNoSeguros: false,

      usoCmd: false,
      powerShell: false,

      analisisVirusSimple: false,
      analisisVirusCompleto: false

    }

  };

  const modal = new bootstrap.Modal(
    document.getElementById('modalPerfil')
  );

  modal.show();

}

// ================================
// MODAL EDITAR
// ================================

editar(perfil: any): void {

  this.idEditar = perfil.id;

  this.perfil = JSON.parse(
    JSON.stringify(perfil)
  );

  const modal = new bootstrap.Modal(
    document.getElementById('modalPerfil')
  );

  modal.show();

}

// ================================
// VER PERMISOS
// ================================

verPermisos(perfil: any): void {

  this.perfilSeleccionado = perfil;

  const modal = new bootstrap.Modal(
    document.getElementById('modalPermisos')
  );

  modal.show();

}

// ================================
// GUARDAR
// ================================

guardar(): void {

  if (this.idEditar === 0) {

    this.perfilService
      .crearPerfil(this.perfil)
      .subscribe({

        next: () => {

          this.cargarPerfiles();

          bootstrap.Modal
            .getInstance(
              document.getElementById('modalPerfil')
            )
            ?.hide();

        },

        error: (err) => {

          console.error(
            'Error creando perfil',
            err
          );

        }

      });

  }

  else {

    this.perfilService
      .actualizarPerfil(
        this.idEditar,
        this.perfil
      )
      .subscribe({

        next: () => {

          this.cargarPerfiles();

          bootstrap.Modal
            .getInstance(
              document.getElementById('modalPerfil')
            )
            ?.hide();

        },

        error: (err) => {

          console.error(
            'Error editando perfil',
            err
          );

        }

      });

  }

}

// ================================
// ELIMINAR
// ================================

eliminar(id: number): void {

  const confirmar = confirm(
    '¿Desea eliminar este perfil?'
  );

  if (!confirmar) {
    return;
  }

  this.perfilService
    .eliminarPerfil(id)
    .subscribe({

      next: () => {

        this.perfiles =
          this.perfiles.filter(
            perfil => perfil.id !== id
          );

      },

      error: (err) => {

        console.error(
          'Error eliminando perfil',
          err
        );

      }

    });

}
// ==========================================
// CERRAR MODALES
// ==========================================

cerrarModalPerfil(): void {

  const modal = bootstrap.Modal.getInstance(
    document.getElementById('modalPerfil')
  );

  modal?.hide();

}

cerrarModalPermisos(): void {

  const modal = bootstrap.Modal.getInstance(
    document.getElementById('modalPermisos')
  );

  modal?.hide();

}


// ==========================================
// MÉTODOS AUXILIARES
// ==========================================

nuevoPerfil(): any {

  return {

    nombre: '',

    permisosManejo: this.inicializarPermisos()

  };

}


// ==========================================
// INICIALIZAR PERMISOS
// ==========================================

inicializarPermisos(): any {

  return {

    activo: true,

    // USB
    usoUSB: false,
    dispositivosExternos: false,
    clonado: false,
    clonadoMasivo: false,

    // Internet
    usoInternet: false,
    permisoDescargas: false,
    redesSociales: false,
    streaming: false,
    sitiosNoSeguros: false,

    // Terminal
    usoCmd: false,
    powerShell: false,

    // Antivirus
    analisisVirusSimple: false,
    analisisVirusCompleto: false

  };

}


// ==========================================
// REINICIAR FORMULARIO
// ==========================================

reiniciarFormulario(): void {

  this.idEditar = 0;

  this.perfil = this.nuevoPerfil();

  this.perfilSeleccionado = null;

}

}