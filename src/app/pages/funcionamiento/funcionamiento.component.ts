import { Component }
from '@angular/core';

@Component({
  selector: 'app-evolucion',

  standalone: true,


  templateUrl: './funcionamiento.component.html',

  styleUrl: './funcionamiento.component.css'
})

export class FuncionamientoComponent {

  usuario = '';
  password = '';

  error = '';
  cargando = false;

  constructor() {}

 
}