import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';

import { Project } from '../../model/project';
import { Person } from '../../model/person';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnChanges {


  @Input() isLogged: boolean = false;
  
  @Input() thePerson?: Person;
  private localPerson?: Person;

  allProjects: Project[] = [];
  projectToSend: Project = new Project();


  constructor(private projectService: ProjectService, private authenticationService: AuthenticationService) {

  }

  
  ngOnChanges(): void {
    this.localPerson = this.thePerson;
    this.getAllProjects();
  }


  public reloadProjects(event: boolean): void {

    if ((event) = true) {
      //reset the project to send
      this.projectToSend = new Project();

      //reload the projects from the data base to show
      this.getAllProjects();
    } else {
      console.log("logging from reload project event, false: ", event);
    }
  }


  private getAllProjects(): void {

    // const personId = this.authenticationService.authenticatedUser.id
    const personId = this.localPerson?.getId
    console.log("-----From getAllProjects, personId: ", personId);
    
    this.projectService.getProjectsByPersonId(personId as number).subscribe({
      // this.projectService.getProjectsByPersonId(personId).subscribe({
        
        next: (data) => {
          this.allProjects = data;
          console.log("-----From getAllProjects, personId: ", data, data[0].getPerson.getId);
      },
      error: (err) => {
        console.log("Error from getAllProjects, Project Component", err);
        this.allProjects = [];
      }
    });

  }


  protected sendProject(theProject: Project) {
    this.projectToSend = theProject;
  }


}
