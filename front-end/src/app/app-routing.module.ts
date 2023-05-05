import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
// import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent, pathMatch: 'full' },
  // { path: 'index', component: IndexComponent, pathMatch: 'full', fragment: 'experience' } as Route,
  // { path: 'index', component: IndexComponent, pathMatch: 'full', fragment: 'aboutMe' } as Route,
  // { path: 'login', component: LoginComponent },
  { path: '**', component: Error404Component, canActivate: [GuardGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
