import { Component, Input, OnChanges } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Project } from '../../model/project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges {


  @Input() isLogged: boolean = false;

  allProjects: Project[] = [];
  projectToSend: Project = new Project();


  constructor(private projectService: ProjectService, private authenticationService: AuthenticationService) {

  }


  ngOnChanges(): void {
    // Loading projects and watching for changes to reload them
    this.getAllProjects();
  }


  public reloadProjects(event: boolean): void {

    if ((event) = true) {
      //reset the project to send after using it
      this.projectToSend = new Project();
      //reload the projects from the data base to show
      this.getAllProjects();

    } else {
      console.log("Not reloading projects: ", event);
    }

  }


  private getAllProjects(): void {

    console.log("*** Loading Projects");


    const personEmail = this.authenticationService.authenticatedUser.email;

    if (personEmail) {

      this.projectService.getProjectsByPersonEmail(personEmail!).subscribe({

        next: (res) => {
          this.allProjects = res;
        },

        error: (err) => {
          const errorMessage = err.error.message ?? err.error ?? err;
          console.error("--- Error retrieving projects: ", errorMessage, err.status);
          this.allProjects = [];
        },

        complete: () => {
          console.log("+++ Ok. Load Projects complete");
        },

      });

    } else {
      console.error("--- Error. No person to load projects from");

    }

  }


  protected sendProject(theProject: Project) {
    this.projectToSend = theProject;
  }


}
