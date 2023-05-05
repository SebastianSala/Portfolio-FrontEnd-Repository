import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Person } from '../model/person';
import { PersonData } from '../model/data';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private url = 'http://localhost:8080/person/login';

  currentUserSubject: BehaviorSubject<PersonData>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


  // public login(credentials: any): Observable<HttpResponse<JSON>> {
  public login(credentials: any): Observable<HttpResponse<Person>> {

    console.log("Login service, expected: personId and name from backend");

    return this.httpClient.post<PersonData>(this.url, credentials).pipe(
      map(response => {
        
        let personData = {
          id: response.id,
          email: response.email
        } as PersonData;
        
        const thePerson = new Person(personData);
        sessionStorage.setItem('currentUser', JSON.stringify(thePerson));

        console.log("The current user subject BEFORE-------------------------:", this.currentUserSubject.value);
        this.currentUserSubject.next(personData);
        console.log("The current user subject AFTER-------------------------:", this.currentUserSubject.value);
        
        // return response;        
        return new HttpResponse({ status: 200, body: thePerson });
      })
    );

  }


  public get autenticatedUser() {
    return this.currentUserSubject.value;
  }


}
