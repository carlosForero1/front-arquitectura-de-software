import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule }
from '@angular/common/http';

import { FormsModule }
from '@angular/forms';

import { AppComponent }
from './app.component';

import { LoginComponent }
from './pages/login/login.component';

import { DashboardComponent }
from './pages/dashboard/dashboard.component';

import { AppRoutingModule }
from './app-routing-module';

import { MenuComponent }
from './pages/menu/menu';

@NgModule({

  declarations: [

    AppComponent,
    LoginComponent,
    DashboardComponent

  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    MenuComponent

  ],

  providers: [],

  bootstrap: [AppComponent]

})
export class AppModule {}