import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PersonData, ResponseMessage } from '../model/dataTypes';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './TokenStorage';


@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private url: string = environment.URL + '/person';

  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  private token = this.tokenStorageService.getToken;
  // private headers: HttpHeaders = new HttpHeaders({
  //   // 'Content-Type': 'application/json',
  //   'Authorization': 'Bearer ' + this.token
  // });

  private headers = new HttpHeaders()
    .set("Authorization", 'Bearer ' + this.token)
    .set("Content-Type", 'application/json');
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     // 'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.token
  //   })
  // };


  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {

  }


  public registerPerson(person: Person): Observable<ResponseMessage> {

    // const theUrl: string = `${this.url}/create`;
    const theUrl: string = `${environment.URL}/auth/register`;
    return this.httpClient.post<ResponseMessage>(theUrl, person);
    // .pipe(
    //   catchError(this.handleError)
    // );

  }

  public createPerson(person: Person): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/create`;
    return this.httpClient.post<ResponseMessage>(theUrl, person).pipe(
      catchError(this.handleError)
    );

  }


  public getPersons(): Observable<Person[]> {

    const theUrl = `${this.url}/list`;

    return this.httpClient.get<PersonData[]>(theUrl).pipe(
      map(
        allPersons => allPersons.map(
          individualPerson => new Person(individualPerson)
        )
      ),
      catchError(this.handleError)
    );

  }


  public getPersonByEmail(email: string): Observable<Person> {

    const theUrl = `${this.url}/list/person?email=${email}`

    // return this.httpClient.get<PersonData>(theUrl, this.httpOptions).pipe(
    // return this.httpClient.get<PersonData>(theUrl, {headers: this.headers} ).pipe(
    return this.httpClient.get<PersonData>(theUrl).pipe(
      map(
        personData => new Person(personData)
      ),
      catchError(this.handleError)
    );

  }


  public getPersonById(personId: number): Observable<Person> {

    const theUrl = `${this.url}/list/${personId}`;

    return this.httpClient.get<PersonData>(theUrl).pipe(
      map(
        personData => new Person(personData)
      )
    );

  }

  //http://localhost:8080/person/edit/1
  public updatePersonById(personId: number, person: Person): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/edit/${personId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, person, { headers: this.headers });

  }


  public deletePersonById(personId: number): Observable<ResponseMessage> {

    const theUrl = `${this.url}/delete?id=${personId}`;
    return this.httpClient.delete<ResponseMessage>(theUrl);

  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("--- Error. An Error ocurred", error.error);
    } else {
      console.error("--- Error. Backend message: ", error.error.message, error.status);
    }
    // return throwError(() => new Error(error.error.message || "Error ocurred, try again"))
    return throwError(() => error || new Error("Error ocurred, try again"))
  }


}
