import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Person } from '../model/person';
import { PersonData } from '../model/data';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private url = 'http://localhost:8080/person/login';

  currentUserSubject: BehaviorSubject<PersonData>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


  public login(credentials: any): Observable<HttpResponse<Person>> {

    console.log("Login service, expected: personId and name from backend");

    return this.httpClient.post<PersonData>(this.url, credentials).pipe(
      map(response => {

        let thePerson: Person = new Person();
        
        if (response.id) {

          let personData = {
            id: response.id,
            email: response.email,
            name: response.name
          } as PersonData;
          
          thePerson = new Person(personData);
          sessionStorage.setItem('currentUser', JSON.stringify(thePerson));
          
          this.currentUserSubject.next(personData);

          // return response;        
          return new HttpResponse({ status: 200, body: thePerson });

        } else {

          sessionStorage.setItem('currentUser', JSON.stringify({}));          
          return new HttpResponse({ status: 401 });

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


}
