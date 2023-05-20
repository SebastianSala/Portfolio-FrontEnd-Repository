import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ExperienceData, ResponseMessage } from '../model/dataTypes';

import { environment } from '../../environments/environment';
import { Experience } from '../model/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {


  private url: string = environment.URL + '/experience';


  constructor(private httpClient: HttpClient) {

  }


  public getExperiencesByPersonEmail(personEmail: String): Observable<Experience[]> {

    const theUrl = `${this.url}/person/${personEmail}`;

    return this.httpClient.get<ExperienceData[]>(theUrl).pipe(
      map(
        allExperiences => allExperiences.map(
          individualExperience => new Experience(individualExperience)
        )
      )
    )

  }


  public getExperiencesByPersonIdByExperienceId(personId: number, experienceId: number): Observable<Experience> {

    const theUrl = `${this.url}/person/${personId}/experience/${experienceId}`;

    return this.httpClient.get<ExperienceData>(theUrl).pipe(
      map(
        experience => new Experience(experience)
      )
    )

  }


  public createExperienceByPersonId(personId: number, experience: Experience): Observable<ResponseMessage> {

    const url = `${this.url}/person/${personId}/experience`
    return this.httpClient.post<ResponseMessage>(url, experience);

  }


  public updateExperienceByPersonIdByExperienceId(personId: number, experienceId: number, experience: Experience): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/${personId}/experience/${experienceId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, experience);

  }


  public deleteExperienceByPersonIdByExperienceId(personId: number, experienceId: number): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/delete?personId=${personId}&experienceId=${experienceId}`
    return this.httpClient.delete<ResponseMessage>(theUrl)

  }


}