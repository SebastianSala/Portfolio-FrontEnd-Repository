import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';

import { ProjectData } from '../../model/data';
import { Project } from '../../model/project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  modoEdit: boolean = true;

  allProjects: Project[] = [];
  projectToSend: Project = new Project();


  constructor(private projectService: ProjectService) {

  }


  ngOnInit(): void {

    this.getAllProjects();

  }


  public reloadProjects(event: boolean): void {
    console.log("logging from reload project event", event);
    if ((event) = true) {
      console.log("logging from reload project event, true: ", event);

      //reset the project to send
      this.projectToSend = new Project();

      //reload the projects from the data base to show
      this.getAllProjects();
    } else {
      console.log("logging from reload project event, false: ", event);
    }
  }


  private getAllProjects(): void {


    this.projectService.getProjectsByPersonId(1).subscribe({

      next: (data) => {
        this.allProjects = data;

        console.log("The data of allProjects: ", this.allProjects);
      },

      error: (err) => {
        console.log("Error from getAllProjects, Project Component", err);
        this.allProjects = [];
      }

    });


  }


  protected logProject(message: any) {
    console.log("The child parameter is: ", message);
  }


  protected sendProject(theProject: Project) {
    console.log("the project to send is Project", theProject);
    this.projectToSend = theProject;
  }


}
