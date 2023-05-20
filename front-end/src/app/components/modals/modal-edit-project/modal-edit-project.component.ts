import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectService } from '../../../services/project.service';

import { Project } from '../../../model/project';
import { Person } from '../../../model/person';
import { ProjectData } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-edit-project',
  templateUrl: './modal-edit-project.component.html',
  styleUrls: ['./modal-edit-project.component.scss']
})
export class ModalEditProjectComponent implements OnChanges {


  @Input() projectToEdit!: Project;
  protected person = new Person();

  @Output() editEvent = new EventEmitter<boolean>();
  protected isEdited: boolean = false;

  protected formGroup!: FormGroup;




  constructor(private projectService: ProjectService, protected formBuilder: FormBuilder, private authenticationService: AuthenticationService) {

  }


  ngOnChanges(): void {

    this.formGroup = this.formBuilder.group({
      name: [this.projectToEdit.getName, [Validators.required]],
      date: [this.projectToEdit.getDate, [Validators.required]],
      shortDescription: [this.projectToEdit.getShortDescription, [Validators.required]],
      longDescription: [this.projectToEdit.getLongDescription, [Validators.required]],
      logoUrl: [this.projectToEdit.getLogoUrl, [Validators.required]],
      imgUrl: [this.projectToEdit.getImgUrl, [Validators.required]],
      webUrl: [this.projectToEdit.getWebUrl, [Validators.required]]
    })

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected validateForm(event: Event): void {

    event.preventDefault();

    if (this.formGroup.valid) {
      this.onSubmit();
    } else {
      this.formGroup.markAllAsTouched();
      alert("Error. Revisar campos");
    }

  }


  protected onSubmit() {



    const projectConstructor: ProjectData = {

      // setting id to projectToEdit.getId to update an existing project instead of creating a new one
      id: this.projectToEdit.getId!,
      name: this.formControl['name'].value,
      date: this.formControl['date'].value,
      shortDescription: this.formControl['shortDescription'].value,
      longDescription: this.formControl['longDescription'].value,
      logoUrl: this.formControl['logoUrl'].value,
      imgUrl: this.formControl['imgUrl'].value,
      webUrl: this.formControl['webUrl'].value,
      // setting the person of the project to the person that has logged in
      person: this.authenticationService.authenticatedUser
    }

    const theProject = new Project(projectConstructor);

    console.log("*** Editing Project");

    this.projectService.updateProjectByPersonIdByProjectId(theProject.getPerson.getId!, theProject.getId!, theProject).subscribe({

      next: (res) => {
        alert(res.message);
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`Error from edit Project editModal: ${errorMessage}, Status: ${err.status}`,);
        alert(errorMessage)
        this.isEdited = false;
      },

      complete: () => {
        console.log("+++ Ok. Edit Project complete");

        //reload and show all projects
        this.isEdited = true;
        this.editEmit(this.isEdited);
        //close modal
        document.getElementById("modalEditProjectClose")?.click()
      }

    });

  }


  protected editEmit(edited: boolean) {
    if (edited) {
      this.editEvent.emit(edited);
    }
  }


}
