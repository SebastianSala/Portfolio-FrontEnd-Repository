import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PersonData, ResponseMessage } from '../model/dataTypes';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private url: string = environment.URL + '/person';


  constructor(private httpClient: HttpClient) {

  }


  public createPerson(person: Person): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/create`;
    return this.httpClient.post<ResponseMessage>(theUrl, person);

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
    )

  }


  public getPersonByEmail(email: string): Observable<Person> {

    const theUrl = `${this.url}/list/person?email=${email}`

    return this.httpClient.get<PersonData>(theUrl).pipe(
      map(
        personData => new Person(personData)
      ),
      catchError(this.handleError)
    )

  }


  public getPersonById(personId: number): Observable<Person> {

    const theUrl = `${this.url}/list/${personId}`;

    return this.httpClient.get<PersonData>(theUrl).pipe(
      map(
        personData => new Person(personData)
      )
    )

  }

  //http://localhost:8080/person/edit/1
  public updatePersonById(personId: number, person: Person): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/edit/${personId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, person);

  }


  public deletePersonById(personId: number): Observable<ResponseMessage> {

    const theUrl = `${this.url}/delete?id=${personId}`;
    return this.httpClient.delete<ResponseMessage>(theUrl);

  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An Error ocurred", error.error);
    } else {
      console.error("Backend message: ", error.error.message, error.status);
    }
    // return throwError(() => new Error(error.error.message || "Error ocurred, try again"))
    return throwError(() => error || new Error("Error ocurred, try again"))
  }


}
