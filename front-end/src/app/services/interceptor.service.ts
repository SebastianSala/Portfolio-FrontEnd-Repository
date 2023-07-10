import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { AuthenticationService } from './authentication.service';
import { TokenStorageService } from './TokenStorage';


const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private isRefreshing: boolean = false;


  constructor(private tokenStorageService: TokenStorageService, private authenticationService: AuthenticationService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentUser = this.authenticationService.authenticatedUser;

    // if (currentUser && currentUser.email) {
    //   // console.log("log from interceptor 1");

    //   req = req.clone({
    //     // setHeaders: {
    //     //   Authorization: `Bearer ${currentUser.email}`
    //     // }
    //   });
    //   // console.log("log from interceptor 2");
    // }

    let authReq = req;
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      console.log("token != null?");
      
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }



      // req = req.clone(
      //   {
      //     withCredentials: true
      //   }
      // );

      console.log("Interceptor is running: ");



      return next.handle(authReq).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            !req.url.includes('auth/login') &&
            error.status == 401
          ) {
            console.log("write handle401Error");

            // return this.handle401Error(req, next);
          }

          return throwError(() => error);
        })
      );

    }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authenticationService.isLoggedIn) {
        console.log("is logged in!");
      }
    }

  }


}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
];


