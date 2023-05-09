import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Person } from '../model/person';
import { PersonData } from '../model/data';
import { ResponseMessage } from '../model/data';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private url = 'http://localhost:8080/person/login';

  currentUserSubject: BehaviorSubject<PersonData>;

  private loggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


  // public login(credentials: any): Observable<HttpResponse<Person>> {
  public login(credentials: any): Observable<Person | ResponseMessage> {
  // public login(credentials: any): Observable<any> {

    console.log("Login service, expected: personId and name from backend");

    // return this.httpClient.post<PersonData | ResponseMessage>(this.url, credentials).pipe(
    return this.httpClient.post<PersonData | ResponseMessage>(this.url, credentials).pipe(
      map(response => {

        let thePerson: Person = new Person();
        const res = response as PersonData;
        
        if (res.id) {

          let personData = {
            id: res.id,
            email: res.email,
            name: res.name
          } as PersonData;
          
          thePerson = new Person(personData);
          sessionStorage.setItem('currentUser', JSON.stringify(thePerson));
          
          this.currentUserSubject.next(personData);

          this.loggedIn = true;

          // return response;        
          // return new HttpResponse({ status: 200, body: thePerson });
          return thePerson as Person;

        } else {

          this.loggedIn = false;

          sessionStorage.setItem('currentUser', JSON.stringify({}));          
          // return new HttpResponse({ status: 401 });
          const res = response as ResponseMessage;
          return res;

        }

      })
    );

  }


  public get authenticatedUser() {
    return this.currentUserSubject.value;
  }  
  public set authenticatedUser(user: PersonData) {
    this.currentUserSubject.next(user);
  }
  
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }
  public set isLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }



}
