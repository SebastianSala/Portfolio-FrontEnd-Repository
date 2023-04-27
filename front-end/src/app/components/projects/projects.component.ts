import { Component, OnInit } from '@angular/core';

// import {DbService} from '../../services/db.service';
import { ProjectService } from '../../services/project.service';

import { Data, DataExperienceProjects, ProjectData } from '../../model/data';
import { Project } from '../../model/project';
import { HttpResponse } from '@angular/common/http';
import { Person } from 'src/app/model/person';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {


  modoEdit: boolean = true;

  dProjects?: DataExperienceProjects[];

  allProjects: Project[] = [];
  // oneProject: Project = {} as Project;
  oneProject: Project = new Project();

  // theLastProject?: number = 1;
  // someProject?: Project;


  // constructor(private db: DbService) {
  constructor(private projectService: ProjectService) {

  }


  ngOnInit(): void {
    // console.log("ONEproject BEFORE CONSTRUCTOR: ", this.oneProject.getId);
    // this.oneProject = new Project(undefined, "undefined", "j", "j", "j", "j", "j", "j", new Person(1, "a", "a", "a", "a", "a", "a", "a", "a", "a"));
    // console.log("ONEproject after CONSTRUCTOR: ", this.oneProject);
    // this.oneProject = new Project();
    // console.log("ONEproject after CONSTRUCTOR: ", this.oneProject);
    // this.oneProject.setId = 3;
    // console.log("ONEproject after CONSTRUCTOR: ", this.oneProject.getId);


    // this.db.getData().subscribe(
    //   data => {
    //     const lData: Data = data as Data;
    //     this.dProjects = lData.Projects;
    //   }
    // );

    // this.getProject();
    // this.createProject();

    this.getAllProjects();

    //this.getProject();

  }

  private getAllProjects(): void {

    this.projectService.getProjectsByPersonId(1).subscribe(
      data => {

        this.allProjects = data;

        // console.log("the last project from data.length", data[data.length - 1]);

        // let lastProject = new Project(data[data.length - 1] as unknown as ProjectData);
        // console.log("This are all the projects of person 1", data);
        // this.theLastProject = lastProject.getId;//data.length;
        // console.log("The last Project created was id: ", this.theLastProject);

        // this.getProject();

      },
      error => {
        console.log(error);
      }
    )

  }

  private getProject(): void {

    this.projectService.getProjectsByPersonIdByProjectId(1, 10).subscribe({

      next: (data) => {
        console.log("the next step", data);

        console.log("oneProject id : ", this.oneProject.getId);
        this.oneProject.setId = 41;
        console.log("oneProject id after : ", this.oneProject.getId);

        this.oneProject = data;
        console.log("oneProject: ", this.oneProject);
        console.log("oneProject id after : ", this.oneProject.getId);

        this.oneProject = new Project(data as unknown as ProjectData);
        console.log("oneProject: ", this.oneProject);
        console.log("oneProject id after : ", this.oneProject.getId);
      },
      error: (err) => {
        console.log("the error step", err);
      },
      complete: () => {
        console.log("complete step");
        console.log(this.oneProject);

        this.createProject();

      }

      // ((data) => console.log("the next step", data)),
      // ((err) => console.log("the error step", err)),
      // (() => console.log("complete step"))
    })

    // let theProject: Project;
    // this.projectService.getProjectsByPersonIdByProjectId(1, this.theLastProject as number).subscribe(
    //   data => {

    //     // theProject = new Project(data as unknown as ProjectData);
    //     // console.log("this is the raw project: ", data);

    //     // // this.someProject = new Project(theProject as unknown as ProjectData);
    //     // this.someProject = new Project(data as unknown as ProjectData);
    //     // console.log("this is the someProject project: ", this.someProject);
    //     // console.log("the Person from someProject before: ", this.someProject.getPerson);


    //     // console.log("the Person from data: ", data.getPerson);
    //     // this.someProject.setPerson = theProject.getPerson;
    //     // console.log("the Person from someProject after: ", this.someProject.getPerson);


    //     // console.log("this is the someProject: ", this.someProject);
    //     // this.someProject.setDate = "1985-01-01";
    //     // console.log("this is the someProject: ", this.someProject.getDate);

    //     // this.createProject();

    //   },
    //   error => {
    //     console.log("Error from getProject: ", error);

    //   }
    // );

  }

  private createProject(): void {

    this.oneProject.setDate = "";
    this.oneProject.setId = 0;
    console.log("The Id of oneProject", this.oneProject.getId);


    this.projectService.createProjectByPersonId(1, this.oneProject).subscribe({
      next: (data) => console.log("the data of create", data, data.body, data.status, data.statusText)

    })

    // console.log("log from create 1");
    // if (this.someProject) {
    //   this.someProject.setDate = "1985-01-01";
    //   console.log("Date from crete (1): ", this.someProject?.getDate);
    // }
    // console.log("Date from crete: ", this.someProject?.getDate);
    // console.log("log from create 2");

    //setting id to 0 to create a new project or else it would update and existing project of the same id    
    // this.someProject!.setId = 0;

    // this.projectService.createProjectByPersonId(1, this.someProject!).subscribe(
    //   response => {
    //     // console.log("This is the response: ", response);
    //     // console.log("deleting: ", this.theLastProject);
    //     // this.deleteProject();
    //     // console.log("deleted: ", this.theLastProject);
    //   },
    //   error => {
    //     console.log("createProject, error thrown: ", error);
    //   }
    // );

  }

  private deleteProject(): void {


    // this.projectService.deleteProjectByPersonIdByProjectId(1, this.theLastProject!).subscribe(
    //   // (response: HttpResponse<JSON>) => {
    //   (response: any) => {
    //     // console.log("This is the response: ", response);
    //     // console.log("the response status from delete: ", response.status);
    //     // console.log("the response body from delete: ", response.body.value);
    //     // console.log("the response body from delete: ", response.body);

    //   },
    //   error => {
    //     console.log("Error from deleteProject: ", error);

    //   }
    // );

  }



}
