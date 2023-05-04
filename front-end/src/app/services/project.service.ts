import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Project } from '../model/project';
import { ProjectData } from '../model/data';


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
    // return this.httpClient.get<Project[]>(this.url + `/person/${personId}` + "/list");
    // return this.httpClient.get<Project[]>(this.url + `/person/${personId}` + "/list").pipe(
    return this.httpClient.get<ProjectData[]>(this.url + `/person/${personId}` + "/list").pipe(
      // map(allProjects => allProjects.map(individualProject => new Project(individualProject as unknown as ProjectData)))
      map(allProjects => allProjects.map(individualProject => new Project(individualProject)))
    )
  }

  public getProjectsByPersonIdByProjectId(personId: number, projectId: number): Observable<Project> {
    // return this.httpClient.get<Project>(this.url + `/person/${personId}/project/${projectId}`);
    return this.httpClient.get<ProjectData>(this.url + `/person/${personId}/project/${projectId}`).pipe(
      map(project => new Project(project))
    )
  }

  public createProjectByPersonId(personId: number, project: Project): Observable<HttpResponse<JSON>> {
    return this.httpClient.post<JSON>(`${this.url}/person/${personId}/project`, project, { observe: 'response' });
  }

  
  public updateProjectByPersonIdByProjectId(personId: number, projectId: number, project: Project): Observable<HttpResponse<JSON>> {
    
    const theUrl: string = `${this.url}/person/${personId}/project/${projectId}`;
    
    console.log("From update service, url: ", theUrl);
    console.log("From update service, person id: ", personId);
    console.log("From update service, project id: ", projectId);
    console.log("From update service, project: ", project);
    
    return this.httpClient.put<JSON>(theUrl, project, { observe: "response" });

  }

  
  public deleteProjectByPersonIdByProjectId(personId: number, projectId: number): Observable<HttpResponse<JSON>> {
    // public deleteProjectByPersonIdByProjectId(personId: number, projectId: number): Observable<any>{

    console.log("From delete service, person id: ", personId);
    console.log("From delete service, project id: ", projectId);

    const theUrl: string = `${this.url}/person/delete?personId=${personId}&projectId=${projectId}`

    console.log("From delete service, theUrl: ", theUrl);

    return this.httpClient.delete<JSON>(theUrl, { observe: 'response' }).pipe(
      // return this.httpClient.delete(theUrl).pipe(
      catchError(error => {
        console.log("Error in projectService delete: ", error);
        return throwError(error);
      })
    );

  }

  // public deleteProjectByProjectId(projectId: number): Observable<HttpResponse<JSON>> {
  public deleteProjectByProjectId(projectId: number): Observable<any> {

    console.log("From delete service, project id: ", projectId);

    const theUrl: string = `${this.url}/person/deletex?id=${projectId}`

    console.log("From delete service, theUrl: ", theUrl);

    return this.httpClient.delete<JSON>(theUrl, { observe: 'response' }).pipe(
      // return this.httpClient.delete<any>(theUrl).pipe(
      // return this.httpClient.delete(theUrl).pipe(
      catchError(error => {
        console.log("Error in projectService delete: ", error);
        return throwError(error);
      })
    );

  }


}
