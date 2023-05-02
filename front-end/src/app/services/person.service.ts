import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable, map } from 'rxjs';
import { PersonData } from '../model/data';


@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private url: string = "http://localhost:8080/person"


  constructor(private httpClient: HttpClient) { }


  public getPersons(): Observable<Person[]> {
    // return this.httpClient.get<Person[]>(this.url + '/list');
    return this.httpClient.get<Person[]>(this.url + '/list').pipe(
      map(allPersons => allPersons.map(individualPerson => new Person(individualPerson as unknown as PersonData)))
    )

  }

  public getPersonById(personId: number): Observable<Person> {
    return this.httpClient.get<Person>(this.url + `/list/${personId}`)
  }

  public deletePersonById(personId: number): Observable<HttpResponse<JSON>> {
    const theUrl = this.url + `/delete?id=${personId}`;
    console.log("deleting person: ", personId, theUrl);
    return this.httpClient.delete<JSON>(theUrl, {observe: "response"});
  }


}
