import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { EducationData, ResponseMessage } from '../model/dataTypes';

import { environment } from '../../environments/environment';
import { Education } from '../model/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {


  private url: string = environment.URL + '/education';


  constructor(private httpClient: HttpClient) {

  }


  public getEducationsByPersonEmail(personEmail: String): Observable<Education[]> {

    const theUrl = `${this.url}/person/${personEmail}`;

    return this.httpClient.get<EducationData[]>(theUrl).pipe(
      map(
        allEducations => allEducations.map(
          individualEducation => new Education(individualEducation)
        )
      )
    )

  }


  public getEducationsByPersonIdByEducationId(personId: number, educationId: number): Observable<Education> {

    const theUrl = `${this.url}/person/${personId}/education/${educationId}`;

    return this.httpClient.get<EducationData>(theUrl).pipe(
      map(
        education => new Education(education)
      )
    )

  }


  public createEducationByPersonId(personId: number, education: Education): Observable<ResponseMessage> {

    const url = `${this.url}/person/${personId}/education`
    return this.httpClient.post<ResponseMessage>(url, education);

  }


  public updateEducationByPersonIdByEducationId(personId: number, educationId: number, education: Education): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/${personId}/education/${educationId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, education);

  }


  public deleteEducationByPersonIdByEducationId(personId: number, educationId: number): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/delete?personId=${personId}&educationId=${educationId}`
    return this.httpClient.delete<ResponseMessage>(theUrl)

  }


}