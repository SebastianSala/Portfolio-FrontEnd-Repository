import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { EducationService } from '../../../services/education.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Education } from '../../../model/education';
import { EducationData, EntityChange, EducationProperties } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-edit-education',
  templateUrl: './modal-edit-education.component.html',
  styleUrls: ['./modal-edit-education.component.scss']
})
export class ModalEditEducationComponent {


  @Input() educationToEdit!: Education;
  protected person: Person = new Person();

  protected formGroup: FormGroup;

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


  
  
  ngOnChanges(): void {
    
    this.formGroup = this.formBuilder.group({
      title: [this.educationToEdit.getTitle, [Validators.required]],
      institution: [this.educationToEdit.getInstitution, [Validators.required]],
      description: [this.educationToEdit.getDescription, [Validators.required]],
      startDate: [this.educationToEdit.getStartDate, [Validators.required]],
      endDate: [this.educationToEdit.getEndDate, [Validators.required]],
      logoUrl: [this.educationToEdit.getLogoUrl],
      webUrl: [this.educationToEdit.getWebUrl],
    });
    
  }
  
  
  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {

    const educationConstructor: EducationData = {
      // setting id to educationToEdit.getId to update an existing education instead of creating a new one
      id: this.educationToEdit.getId!,
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

    console.log("*** Editing Education");

    this.educationService.updateEducationByPersonIdByEducationId(theEducation.getPerson.getId!, theEducation.getId!, theEducation).subscribe({

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
        console.error(`Error. Edit Education editModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al editar Educación: ${errorMessage}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Edit Education complete");
        //close modal
        document.getElementById("modalEditEducationClose")?.click()

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
