import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { EducationService } from '../../../services/education.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Education } from '../../../model/education';
import { EducationData, EntityChange, EducationProperties } from '../../../model/dataTypes';

@Component({
  selector: 'app-modal-add-education',
  templateUrl: './modal-add-education.component.html',
  styleUrls: ['./modal-add-education.component.scss']
})
export class ModalAddEducationComponent {


  protected formGroup: FormGroup;

  protected person: Person = new Person();

  protected educationProperties: typeof EducationProperties = EducationProperties;


  public constructor(protected formBuilder: FormBuilder, private educationService: EducationService, private router: Router, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      logoUrl: [''],
      webUrl: [''],
    })

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {

    const educationConstructor: EducationData = {
      //setting id to 0 to create a new education instead of updating an existing one
      id: 0,
      title: this.formControl[this.educationProperties.Title].value,
      institution: this.formControl[this.educationProperties.Institution].value,
      description: this.formControl[this.educationProperties.Description].value,
      startDate: this.formControl[this.educationProperties.StartDate].value,
      endDate: this.formControl[this.educationProperties.EndDate].value,
      logoUrl: this.formControl[this.educationProperties.LogoUrl].value,
      webUrl: this.formControl[this.educationProperties.WebUrl].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }

    const theEducation = new Education(educationConstructor);

    console.log("*** Creating Education");

    this.educationService.createEducationByPersonId(theEducation.getPerson.getId!, theEducation).subscribe({

      next: (data) => {
        // reseting the form after creation
        this.formGroup.reset();
        // reload entities
        const change: EntityChange = { change: true, entity: theEducation };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`Error. Create Education addModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al crear Educación: ${errorMessage}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Create Education complete");
        //close modal
        document.getElementById("modalAddEducationClose")?.click()

        //scroll to the newly created Education
        this.router.navigate(['/index'], { fragment: 'education' });
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
