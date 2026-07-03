import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { MainLayoutComponent } from './pages/menu/main-layout.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { EvolucionComponent } from './pages/evolucion/evolucion.component';
import { FuncionamientoComponent } from './pages/funcionamiento/funcionamiento.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [

  // Al entrar a localhost:4200
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Públicas
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'funcionamiento',
    component: FuncionamientoComponent
  },
  {
    path: 'evolucion',
    component: EvolucionComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },

  // Privadas (con menú)
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'reportes',
        component: ReportesComponent
      },
      {
        path: 'usuarios',
        component: UsuarioComponent
      },
       {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Cualquier otra ruta
  {
    path: '**',
    redirectTo: 'home'
  }

];