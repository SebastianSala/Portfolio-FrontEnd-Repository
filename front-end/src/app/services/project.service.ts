import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Project } from '../model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private url: string = "http://localhost:8080/project";


  constructor(private httpClient: HttpClient) { }


  // public getProjectsByPersonId(personId: number): Observable<Project[]> {
  //   return this.httpClient.get<Project[]>(this.url + `/person/${personId}` + "/list");
  // }
  public getProjectsByPersonId(personId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url + `/person/${personId}` + "/list");
    // .pipe(
    //   map(allProjects => allProjects.map(individualProject => new Project(individualProject)))
    // )
  }

  public getProjectsByPersonIdByProjectId(personId: number, projectId: number): Observable<Project> {
    return this.httpClient.get<Project>(this.url + `/person/${personId}/project/${projectId}`);
  }

  public createProjectByPersonId(personId: number, project: Project): Observable<HttpResponse<JSON>> {
    return this.httpClient.post<JSON>(`${this.url}/person/${personId}/project`, project, {observe: 'response'});
  }

  public updateProjectByPersonIdByProjectId(personId: number, projectId: number, project: Project): Observable<HttpResponse<JSON>> {
    const theUrl: string = `${this.url}/person/${personId}/project/${projectId}`;
    return this.httpClient.put<JSON>(theUrl, project, {observe: "response"});
  }

  public deleteProjectByPersonIdByProjectId(personId: number, projectId: number): Observable<HttpResponse<JSON>> {
    
    const theUrl: string = `${this.url}/person/delete?personId=${personId}&projectId=${projectId}`
    return this.httpClient.delete<JSON>(theUrl, {observe: 'response'});

  }


}
