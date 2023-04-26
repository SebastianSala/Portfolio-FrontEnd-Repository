import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private url: string = "http://localhost:8080/project";


  constructor(private httpClient: HttpClient) { }


  public getProjectsByPersonId(personId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url + `${personId}` + "/list");
  }

  public getProjectsByPersonIdByProjectId(personId: number, projectId: number): Observable<Project> {
    return this.httpClient.get<Project>(this.url + `/person/${personId}/project/${projectId}`);
  }

  public createProjectByPersonId(personId: number, project: Project): Observable<any> {
    return this.httpClient.post<Project>(`${this.url}/person/${personId}/project`, project);
  }

  public updateProjectByPersonIdByProjectId(personId: number, projectId: number, project: Project): Observable<any> {
    const theUrl: string = `${this.url}/person/${personId}/project/${projectId}`;
    return this.httpClient.put<Project>(theUrl, project);
  }

  public deleteProjectByPersonIdByProjectId(personId: number, projectId: number): Observable<HttpResponse<JSON>> {
    
    const theUrl: string = `${this.url}/person/delete?personId=${personId}&projectId=${projectId}`
    return this.httpClient.delete<HttpResponse<JSON>>(theUrl);//, {observe: 'response'});

  }


}
