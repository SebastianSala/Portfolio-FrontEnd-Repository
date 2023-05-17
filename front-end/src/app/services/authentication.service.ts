import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Person } from '../model/person';
import { PersonData } from '../model/dataTypes';
import { ResponseMessage } from '../model/dataTypes';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private url = environment.URL + '/person/login';

  currentUserSubject: BehaviorSubject<PersonData>;

  private loggedIn: boolean = false;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


  public login(credentials: any): Observable<Person | ResponseMessage> {


    return this.httpClient.post<PersonData | ResponseMessage>(this.url, credentials).pipe(
      map(response => {

        let thePerson: Person = new Person();
        const res = response as PersonData;


        if (res.id != null) {
 

          let personData = {
            id: res.id,
            email: res.email,
            name: res.name
          } as PersonData;

          thePerson = new Person(personData);
          sessionStorage.setItem('currentUser', JSON.stringify(thePerson));

          this.currentUserSubject.next(personData);

          this.loggedIn = true;

          return thePerson as Person;


        } else {

          this.loggedIn = false;

          sessionStorage.setItem('currentUser', JSON.stringify({}));
          const resError = response as ResponseMessage;          
          
          return resError;

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
