import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Person } from '../model/person';
import { PersonData } from '../model/dataTypes';
import { ResponseMessage } from '../model/dataTypes';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './TokenStorage';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private backendUrl = environment.URL + '/auth';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private currentUserSubject: BehaviorSubject<PersonData> = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('auth-user') || '{}'));

  private currentUserIsLogged: BehaviorSubject<boolean>;

  private loggedIn: boolean = false;


  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('auth-user') || '{}'));
    let user: PersonData = JSON.parse(sessionStorage.getItem("auth-user") || '{}');
    const condition: boolean = ((user.id == null) ? false : true);
    this.currentUserIsLogged = new BehaviorSubject<boolean>(condition);
  }


  public login(credentials: any): Observable<Person | ResponseMessage> {


    const loginUrl = this.backendUrl + '/login';

    // console.warn("*** login: ", loginUrl, credentials, this.httpOptions);


    return this.httpClient.post<PersonData | ResponseMessage | any>(loginUrl, credentials, this.httpOptions).pipe(
      map(response => {

        this.tokenStorage.saveToken(response);

        let thePerson: Person = new Person();
        const res = response.personDTO as PersonData;


        if (res.id != null) {


          let personData = {
            id: res.id,
            email: res.email,
            name: res.name            
          } as PersonData;

          thePerson = new Person(personData);
          this.tokenStorage.saveUser(response);

          this.currentUserSubject.next(personData);

          this.currentUserIsLogged.next(true);

          this.loggedIn = true;

          return thePerson as Person;


        } else {

          this.loggedIn = false;

          this.currentUserIsLogged.next(false);

          // sessionStorage.setItem('auth-user', JSON.stringify({}));
          this.tokenStorage.signOut();
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


  public get userData$():Observable<PersonData> {
    return this.currentUserSubject.asObservable();
  }
  public set userData(person: PersonData) {
    this.currentUserSubject.next(person);
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
