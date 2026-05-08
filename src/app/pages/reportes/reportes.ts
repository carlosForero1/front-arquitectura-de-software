import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  CommonModule,
  DatePipe
} from '@angular/common';

import {
  ReporteService
} from '../../services/reporte.service';

@Component({
  selector: 'app-reportes',

  standalone: true,

  imports: [
    CommonModule,
    DatePipe
  ],

  templateUrl: './reportes.html',
  styleUrl: './reportes.scss'
})

export class ReportesComponent
implements OnInit {

  private reporteService =
    inject(ReporteService);

  reportes: any[] = [];

  ngOnInit(): void {

    this.listarReportes();
  }

  listarReportes() {

    this.reporteService
      .listarReportes()
      .subscribe({

        next: (data) => {

          this.reportes = data;
        },

        error: (err) => {

          console.log(err);
        }

      });
  }
}