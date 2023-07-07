import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private isRefreshing: boolean = false;


  // constructor(private storageService: StorageService, private eventBusService: EventBusService, private authenticationService: AuthenticationService) {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor, private storageService: StorageService, private authenticationService: AuthenticationService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // let currentUser = this.authenticationService.authenticatedUser;

    // if (currentUser && currentUser.email) {
    // req = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${currentUser.email}`
    //   }
    // });I
    // }


    req = req.clone(
      {
        withCredentials: true
      }
    );

    // console.log("Interceptor is running: ");
    
    // return XSRF-TOKEN in each request's header (anti-CSRF security)
    // const headerName = 'X-XSRF-TOKEN';
    // let token = this.tokenExtractor.getToken() as string;
    // if (token !== null && !req.headers.has(headerName)) {
    //   req = req.clone({ headers: req.headers.set(headerName, token) });
    // }

    return next.handle(req).pipe(
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

      if (this.storageService.isLoggedIn()) {
        console.log("is logged in!, now the rest");
      }
    }

  }


}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
];


