import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor(private authenticationService: AuthenticationService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentUser = this.authenticationService.authenticatedUser;

    if (currentUser && currentUser.email) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.email}`
        }
      });
    }

    console.log("Intercepto is running: ", JSON.stringify(currentUser));

    return next.handle(req);

  }


}
