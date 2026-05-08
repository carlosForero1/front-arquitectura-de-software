import { Component }
from '@angular/core';

import {
  Router,
  RouterOutlet
} from '@angular/router';

import { MenuComponent }
from '../menu/menu';

import { AuthService }
from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    RouterOutlet,
    MenuComponent
  ],

  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  cerrarSesion() {

    this.auth.cerrarSesion();

    this.router.navigate([
      '/login'
    ]);
  }
} 