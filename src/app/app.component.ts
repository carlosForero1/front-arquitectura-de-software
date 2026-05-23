import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MenuComponent } from './pages/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    CommonModule,
    MenuComponent
  ],

  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(
    public router: Router
  ) {}

}