import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Project } from '../model/project';
import { ProjectData, ResponseMessage } from '../model/dataTypes';

import { ENVIROMENT } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private url: string = ENVIROMENT.url + '/project';


  constructor(private httpClient: HttpClient) {

  }


  public getProjectsByPersonEmail(personEmail: String): Observable<Project[]> {

    const theUrl = `${this.url}/person/${personEmail}`;

    return this.httpClient.get<ProjectData[]>(theUrl).pipe(
      map(
        allProjects => allProjects.map(
          individualProject => new Project(individualProject)
        )
      )
    )

  }


  public getProjectsByPersonIdByProjectId(personId: number, projectId: number): Observable<Project> {

    const theUrl = `${this.url}/person/${personId}/project/${projectId}`;

    return this.httpClient.get<ProjectData>(theUrl).pipe(
      map(
        project => new Project(project)
      )
    )

  }


  public createProjectByPersonId(personId: number, project: Project): Observable<ResponseMessage> {

    const url = `${this.url}/person/${personId}/project`
    return this.httpClient.post<ResponseMessage>(url, project);

  }


  public updateProjectByPersonIdByProjectId(personId: number, projectId: number, project: Project): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/${personId}/project/${projectId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, project);

  }


  public deleteProjectByPersonIdByProjectId(personId: number, projectId: number): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/delete?personId=${personId}&projectId=${projectId}`
    return this.httpClient.delete<ResponseMessage>(theUrl)

  }


}