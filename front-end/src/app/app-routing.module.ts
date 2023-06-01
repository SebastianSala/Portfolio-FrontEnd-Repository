import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardGuard } from './services/guard.guard';

import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { Error404Component } from './components/error404/error404.component';
import { IndexComponent } from './components/index/index.component';
import { NewUserComponent } from './components/new-user/new-user.component';


const routes: Routes = [
  // { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'delete-user', component: DeleteUserComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: Error404Component, canActivate: [GuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
