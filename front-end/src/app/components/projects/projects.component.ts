import { Component, Input, OnChanges } from '@angular/core';

import { ProjectService } from '../../services/project.service';

import { AuthenticationService } from '../../services/authentication.service';

import { Project } from '../../model/project';
import { Person } from '../../model/person';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnChanges {


  @Input() isLogged: boolean = false;

  @Input() thePerson?: Person;

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

    const personEmail = this.authenticationService.authenticatedUser.email

    if (personEmail) {

      this.projectService.getProjectsByPersonEmail(personEmail!).subscribe({

        next: (res) => {
          this.allProjects = res;
        },

        error: (err) => {
          const message = err.error.message;
          console.log("Error from getAllProjects: ", message);
          this.allProjects = [];
        },

        complete: () => {
          console.log("Projects loaded");
        },

      });

    }

  }


  protected sendProject(theProject: Project) {
    this.projectToSend = theProject;
  }


}
