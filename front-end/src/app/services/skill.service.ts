import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { SkillData, ResponseMessage } from '../model/dataTypes';

import { environment } from '../../environments/environment';
import { Skill } from '../model/skill';


@Injectable({
  providedIn: 'root'
})
export class SkillService {


  private url: string = environment.URL + '/skill';


  constructor(private httpClient: HttpClient) {

  }


  public getSkillsByPersonEmail(personEmail: String): Observable<Skill[]> {

    const theUrl = `${this.url}/person/${personEmail}`;

    return this.httpClient.get<SkillData[]>(theUrl).pipe(
      map(
        allSkills => allSkills.map(
          individualSkill => new Skill(individualSkill)
        )
      )
    )

  }


  public getSkillsByPersonIdBySkillId(personId: number, skillId: number): Observable<Skill> {

    const theUrl = `${this.url}/person/${personId}/skill/${skillId}`;

    return this.httpClient.get<SkillData>(theUrl).pipe(
      map(
        skill => new Skill(skill)
      )
    )

  }


  public createSkillByPersonId(personId: number, skill: Skill): Observable<ResponseMessage> {

    const url = `${this.url}/person/${personId}/skill`
    return this.httpClient.post<ResponseMessage>(url, skill);

  }


  public updateSkillByPersonIdBySkillId(personId: number, skillId: number, skill: Skill): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/${personId}/skill/${skillId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, skill);

  }


  public deleteSkillByPersonIdBySkillId(personId: number, skillId: number): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/delete?personId=${personId}&skillId=${skillId}`
    return this.httpClient.delete<ResponseMessage>(theUrl)

  }


}