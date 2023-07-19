import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let currentUser = this.authenticationService.authenticatedUser;

    if (currentUser && currentUser.id) {
      return true;
    } else {
      alert("No tiene permiso para ver esta página. Logearse con su email y contraseña para acceder.");
      this.router.navigate(['/index'], { fragment: 'start' });      
      return false;
    }

  }

}
