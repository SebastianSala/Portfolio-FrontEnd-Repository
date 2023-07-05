import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Person } from '../model/person';
import { PersonData } from '../model/dataTypes';
import { ResponseMessage } from '../model/dataTypes';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  // private url = environment.URL + '/person/login';
  private url = environment.URL + '/auth/signin';

  private currentUserSubject: BehaviorSubject<PersonData>;

  private currentUserIsLogged: BehaviorSubject<boolean>;

  private loggedIn: boolean = false;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    // this.currentUserIsLogged = new BehaviorSubject<boolean>(false);
    let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser") || '{}');
    const condition: boolean = ((user.id == null) ? false : true);
    this.currentUserIsLogged = new BehaviorSubject<boolean>(condition);
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

          this.currentUserIsLogged.next(true);

          this.loggedIn = true;

          return thePerson as Person;


        } else {

          this.loggedIn = false;

          this.currentUserIsLogged.next(false);

          sessionStorage.setItem('currentUser', JSON.stringify({}));
          const resError = response as ResponseMessage;

          return resError;

        }


      }),

      catchError(this.handleError)

    );


  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An Error ocurred", error.error);
    } else {
      console.error("Backend message: ", error.error.message, error.status);
    }
    return throwError(() => error || new Error("Error ocurred, try again"))
  }


  public get getUserIsLogged$(): Observable<boolean> {
    return this.currentUserIsLogged.asObservable();
  }

  public set setUserIsLogged(logState: boolean) {
    this.currentUserIsLogged.next(logState);
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
