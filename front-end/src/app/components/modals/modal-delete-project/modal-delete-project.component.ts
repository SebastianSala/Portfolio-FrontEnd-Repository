import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../../services/project.service';

import { Project } from '../../../model/project';


@Component({
  selector: 'app-modal-delete-project',
  templateUrl: './modal-delete-project.component.html',
  styleUrls: ['./modal-delete-project.component.scss']
})
export class ModalDeleteProjectComponent {


  @Input() projectToDelete!: Project;
  protected isDeleted: boolean = false;

  @Output() deleteEvent = new EventEmitter<boolean>();


  constructor(private projectService: ProjectService, private router: Router) {

  }


  public deleteEmit(value: boolean) {
    this.deleteEvent.emit(value);
  }


  deleteProject(): void {

    console.info("*** Deleting Project");

    this.projectService.deleteProjectByPersonIdByProjectId(this.projectToDelete.getPerson.getId as number, this.projectToDelete.getId as number).subscribe({

      next: (res) => {
        console.log("+++ ", res.message);
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Delete project method in deleteModal: ", errorMessage);
        alert(errorMessage);

        this.isDeleted = false;
      },

      complete: () => {
        console.info("+++ Ok. Delete Project complete");
        this.isDeleted = true;
        this.deleteEmit(this.isDeleted);
        this.router.navigate(['/index'], { fragment: 'projects' });
      }
    });

  }


}
