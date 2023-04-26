import { Component, OnInit } from '@angular/core';

// import {DbService} from '../../services/db.service';
import { ProjectService } from '../../services/project.service';

import { Data, DataExperienceProjects, ProjectData } from '../../model/data';
import { Project } from '../../model/project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {


  modoEdit: boolean = true;
  dProjects?: DataExperienceProjects[];

  someProject!: Project;


  // constructor(private db: DbService) {
  constructor(private projectService: ProjectService) {

  }


  ngOnInit(): void {

    // this.db.getData().subscribe(
    //   data => {
    //     const lData: Data = data as Data;
    //     this.dProjects = lData.Projects;
    //   }
    // );

    this.getProject();
    this.createProject();

  }

  private getProject(): void {
    let theProject: Project;
    this.projectService.getProjectsByPersonIdByProjectId(1, 1).subscribe(
      data => {
        theProject = data
        console.log("this is the raw project: ", data);

        this.someProject = new Project(theProject as unknown as ProjectData);
        console.log("this is the someProject: ", this.someProject);
      },
      error => {
        console.log("error from create project: ", error);

      }
    );
  }

  private createProject(): void {


    console.log("log from create 1");
    this.someProject.SetDate = "1985-01-01";
    console.log("log from create 2");

    this.projectService.createProjectByPersonId(1, this.someProject!).subscribe(
      response => {
        console.log("This is the response: ", response);
      },
      error => {
        console.log("Create project, this here is the error thrown", error);
      }
    );

  }

  private deleteProject(): void {


    this.projectService.deleteProjectByPersonIdByProjectId(1, 2).subscribe(
      response => {
        console.log("This is the response: ", response);
      },
      error => {
        console.log(error);

      }
    );
  }



}
