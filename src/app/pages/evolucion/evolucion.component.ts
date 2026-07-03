import { Component }
from '@angular/core';

@Component({
  selector: 'app-evolucion',

  standalone: true,


  templateUrl: './evolucion.component.html',

  styleUrl: './evolucion.component.css'
})

export class EvolucionComponent {

  usuario = '';
  password = '';

  error = '';
  cargando = false;

  constructor() {}

 
}