import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { MainLayoutComponent } from './pages/menu/main-layout.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';


export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];