import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from '../../../services/project.service';

import { Person } from '../../../model/person';
import { Project } from '../../../model/project';
import { ProjectData } from '../../../model/dataTypes';

@Component({
  selector: 'app-modal-add-project',
  templateUrl: './modal-add-project.component.html',
  styleUrls: ['./modal-add-project.component.scss']
})
export class ModalAddProjectComponent {

  @Output() addEvent = new EventEmitter<boolean>;
  protected isAdded: boolean = false;

  protected formGroup: FormGroup;

  protected person: Person = new Person();


  public constructor(protected formBuilder: FormBuilder, private projectService: ProjectService, private router: Router, private authenticationService: AuthenticationService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      longDescription: ['', [Validators.required]],
      logoUrl: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      webUrl: ['', [Validators.required]],
    })

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected addEmit(added: boolean) {
    if (added) {
      this.addEvent.emit(added);
    }
  }


  protected onSubmit() {


    const projectConstructor: ProjectData = {
      //setting id to 0 to create a new project instead of updating an existing one
      id: 0,
      name: this.formControl['name'].value,
      date: this.formControl['date'].value,
      shortDescription: this.formControl['shortDescription'].value,
      longDescription: this.formControl['longDescription'].value,
      logoUrl: this.formControl['logoUrl'].value,
      imgUrl: this.formControl['imgUrl'].value,
      webUrl: this.formControl['webUrl'].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }        

    const theProject = new Project(projectConstructor);

    // this.projectService.createProjectByPersonId(theProject.getPerson.getId!, theProject).subscribe({
    this.projectService.createProjectByPersonId(theProject.getPerson.getId!, theProject).subscribe({

      next: (data) => {
        // reseting the form after creation
        this.formGroup.reset();
        alert(data.message)
      },

      error: (err) => {
        const message = err.error.message;        
        console.log(`Error from Create Project addModal: ${message}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error Creating Project: ${message}, status: ${err.status}`);

        this.isAdded = false;
      },

      complete: () => {
        //reload and show all projects
        this.isAdded = true;
        this.addEmit(this.isAdded);
        //close modal
        document.getElementById("modalAddClose")?.click()

        //scroll to the newly created Project
        this.router.navigate(['/index'], { fragment: 'projects' });
      }

    });

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


  protected clearForm(): void {
    this.formGroup.reset();
  }


}
