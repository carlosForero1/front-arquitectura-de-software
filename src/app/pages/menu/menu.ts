import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})

export class MenuComponent {

  perfil = '';

  authService = inject(AuthService);

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
}