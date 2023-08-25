import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { C404Component } from './pages/c404/c404.component';
import { UserCardComponent } from './componentes/user-card/user-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    NewuserComponent,
    UpdateuserComponent,
    MenuComponent,
    C404Component,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
