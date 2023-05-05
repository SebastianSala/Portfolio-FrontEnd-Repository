import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {


  constructor(private loginService: LoginService, private router: Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let currentUser = this.loginService.autenticatedUser;

    if (currentUser && currentUser.id) {
      return true;
    } else {
      alert("not allowed");
      this.router.navigate(['/index'], { fragment: 'start' });      
      return false;
    }

  }

}
