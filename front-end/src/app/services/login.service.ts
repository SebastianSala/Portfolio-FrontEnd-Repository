import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private url = 'http://localhost:8080/person/login';

  currentUserSubject: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


  public login(credentials: any): Observable<any> {

    console.log("Login service, expected: personId and name from backend");

    return this.httpClient.post<any>(this.url, credentials).pipe(
      map(response => {
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        return response;
      })
    )

  }


}
