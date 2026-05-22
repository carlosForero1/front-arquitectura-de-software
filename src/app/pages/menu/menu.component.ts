import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  perfil = '';

  authService = inject(AuthService);

  router = inject(Router);

  modulos =
    this.authService.obtenerModulos();

  ngOnInit() {

    const usuario =
      this.authService.obtenerUsuario();

    this.perfil =
      usuario?.menu?.perfil ?? '';

    this.modulos =
      usuario?.menu?.modulos ?? [];
  }

  cerrarSesion() {

    this.authService.cerrarSesion();

    this.router.navigate(['/login']);
  }
}