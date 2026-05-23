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
  Validators
} from '@angular/forms';

import {
  ReporteService
} from '../../services/reporte.service';

@Component({

  selector:
    'app-reportes',

  standalone:
    true,

  imports: [

    CommonModule,

    ReactiveFormsModule

  ],

  templateUrl:
    './reportes.component.html',

  styleUrls: [

    './reportes.component.scss'

  ]

})

export class ReportesComponent
implements OnInit {

  constructor(

    private reporteService:
      ReporteService,

    private fb:
      FormBuilder,

    private cdr:
      ChangeDetectorRef

  ) {}

  reportes:
    any[] = [];

  formulario!:
    FormGroup;

  editando =
    false;

  idEliminar!:
    number;

  idEditando:
    number | null = null;

  ngOnInit(): void {

    this.inicializarFormulario();

    this.listarReportes();

  }

inicializarFormulario(): void {

  this.formulario =

  this.fb.group({

    tipo: [

      '',

      Validators.required

    ],

    descripcion: [

      '',

      Validators.required

    ],

    recomendacionAgente: [''],

    pasosAgente: [''],

    accionesPreAgente: [''],

    tiempoCrea: [

      new Date()

    ],

    usuario: [

      ''

    ],

    activo: [

      true

    ],

    solucionado: [

      false

    ]

  });

}

  listarReportes(): void {

    this.reporteService
      .listarReportes()
      .subscribe({

        next: (
          respuesta
        ) => {

         
          this.reportes =
            [...respuesta];
             console.log(this.reportes)

          this.cdr.detectChanges();

        },

        error: (
          error
        ) => {

          console.error(
            'Error listando',
            error
          );

        }

      });

  }

 guardar(): void {

  if (

    this.formulario.invalid

  ) {

    this.formulario
      .markAllAsTouched();

    return;

  }

  const usuarioGuardado =

    JSON.parse(

      localStorage.getItem(
        'usuario'
      )

      ||

      '{}'

    );

  const data = {

    ...this.formulario.value,

    tiempoCrea:

      new Date(),

    usuario:

      usuarioGuardado.usuario,

    activo:

      true,

    solucionado:

      false

  };

  console.log(
    'ENVIANDO ->',
    data
  );

  const operacion =

    (

      this.editando &&

      this.idEditando

    )

    ?

    this.reporteService
      .editarReporte(

        this.idEditando,

        data

      )

    :

    this.reporteService
      .crearReporte(

        data

      );

  operacion
    .subscribe({

      next: () => {

        this.cerrarModal(
          'modalReporte'
        );

        this.resetFormulario();

        this.listarReportes();

      },

      error: (
        error
      ) => {

        console.error(
          'Error guardando',
          error
        );

      }

    });

}

  editar(
    reporte: any
  ): void {

    this.editando =
      true;

    this.idEditando =
      reporte.id;

    this.formulario
      .patchValue({

        tipo:
          reporte.tipo,

        descripcion:
          reporte.descripcion,

        recomendacionAgente:
          reporte.recomendacionAgente,

        pasosAgente:
          reporte.pasosAgente,

        accionesPreAgente:
          reporte.accionesPreAgente

      });

    this.abrirModal(
      'modalReporte'
    );

  }

  seleccionarEliminar(
    id: number
  ): void {

    this.idEliminar =
      id;

    this.abrirModal(
      'modalEliminar'
    );

  }

  confirmarEliminar(): void {

    this.reporteService
      .eliminarReporte(
        this.idEliminar
      )
      .subscribe({

        next: () => {

          this.cerrarModal(
            'modalEliminar'
          );

          this.listarReportes();

          this.cdr.detectChanges();

        },

        error: (
          error
        ) => {

          console.error(
            'Error eliminando',
            error
          );

        }

      });

  }

 resetFormulario(): void {

  this.formulario.reset({

    tipo: '',

    descripcion: '',

    recomendacionAgente: '',

    pasosAgente: '',

    accionesPreAgente: '',

    tiempoCrea:

      new Date(),

    usuario: '',

    activo:

      true,

    solucionado:

      false

  });

  this.editando =
    false;

  this.idEditando =
    null;

}

  abrirModal(
    id: string
  ): void {

    const modal =

      document
        .getElementById(
          id
        );

    if (
      !modal
    )
      return;

    modal.style.display =
      'block';

    modal.classList
      .add(
        'show'
      );

    document.body
      .classList
      .add(
        'modal-open'
      );

  }

  cerrarModal(
    id: string
  ): void {

    const modal =

      document
        .getElementById(
          id
        );

    if (
      !modal
    )
      return;

    modal.style.display =
      'none';

    modal.classList
      .remove(
        'show'
      );

    document.body
      .classList
      .remove(
        'modal-open'
      );

  }

}