import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private url: string = "http://localhost:8080/person"


  constructor(private httpClient: HttpClient) { }


  public getPerson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url + '/list');
  }

  public getPersonById(personId: number): Observable<Person> {
    return this.httpClient.get<Person>(this.url + `/list/${personId}`)
  }


}
