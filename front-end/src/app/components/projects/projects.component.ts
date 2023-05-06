import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';

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
  private localPerson?: Person;

  allProjects: Project[] = [];
  projectToSend: Project = new Project();


  constructor(private projectService: ProjectService) {

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

    this.projectService.getProjectsByPersonId(this.localPerson?.getId!).subscribe({

      next: (data) => {
        this.allProjects = data;
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
