import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewuserComponent } from './pages/newuser/newuser.component';

import { UserComponent } from './pages/user/user.component';
import { C404Component } from './pages/c404/c404.component';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'newuser', component: NewuserComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'updateuser/:id', component: NewuserComponent},
  {path: '**', component: C404Component}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
