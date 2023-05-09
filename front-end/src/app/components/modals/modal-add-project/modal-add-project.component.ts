import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../model/person';
import { ProjectData } from 'src/app/model/data';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
      console.log("Emiting from modal add: ", added);
      this.addEvent.emit(added);
    }
  }


  protected onSubmit() {


    const projectConstructor: ProjectData = {
      // const projectConstructor = {
      //setting id to 0 to create a new project instead of updating an existing one
      id: 0,
      name: this.formControl['name'].value,
      date: this.formControl['date'].value,
      shortDescription: this.formControl['shortDescription'].value,
      longDescription: this.formControl['longDescription'].value,
      logoUrl: this.formControl['logoUrl'].value,
      imgUrl: this.formControl['imgUrl'].value,
      webUrl: this.formControl['webUrl'].value,
      person: new Person()
    }

    //set the person to the only person relevant for this portfolio project
    //but the backend allows creation of multiple persons with its corresponding projects, experiences, etc and proper relationships between them.
    // projectConstructor.person.setId = 1;        
    projectConstructor.person.setId = this.authenticationService.authenticatedUser.id;

    const theProject = new Project(projectConstructor);

    this.projectService.createProjectByPersonId(theProject.getPerson.getId!, theProject).subscribe({

      next: (data) => {
        console.log("the return of create: ", data);
        this.formGroup.reset();
      },

      error: (err) => {
        console.log("Error from Create Project addModal: ", err);
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

    console.log("log from onSubmit start");
    event.preventDefault();
    console.log("log from after prevent default");

    if (this.formGroup.valid) {
      console.log("form validated: ", this.formControl['value']);
      this.onSubmit();
    } else {
      console.log("form not validated: ", JSON.stringify(this.formControl['value']));
      this.formGroup.markAllAsTouched();
      alert("revisar campos");
    }

  }


  protected clearForm(): void {
    this.formGroup.reset();
  }


}
