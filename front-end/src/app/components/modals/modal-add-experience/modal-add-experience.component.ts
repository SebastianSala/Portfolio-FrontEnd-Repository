import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExperienceService } from '../../../services/experience.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Experience } from '../../../model/experience';
import { ExperienceData, EntityChange, ExperienceProperties } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-add-experience',
  templateUrl: './modal-add-experience.component.html',
  styleUrls: ['./modal-add-experience.component.scss']
})
export class ModalAddExperienceComponent {


  protected formGroup: FormGroup;

  protected person: Person = new Person();

  protected experienceProperties: typeof ExperienceProperties = ExperienceProperties;


  public constructor(protected formBuilder: FormBuilder, private experienceService: ExperienceService, private router: Router, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      position: ['', [Validators.required]],
      description: ['', [Validators.required]],
      company: ['', [Validators.required]],
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

    // position: string;
    // description: string;
    // company: string;
    // startDate: string;
    // endDate: string;
    // logoUrl: string;
    // webUrl: string;    
    const experienceConstructor: ExperienceData = {
      //setting id to 0 to create a new experience instead of updating an existing one
      id: 0,
      // position: this.formControl[ExperienceProperties.Position].value,
      position: this.formControl[this.experienceProperties.Position].value,
      description: this.formControl[this.experienceProperties.Description].value,
      company: this.formControl[this.experienceProperties.Company].value,
      startDate: this.formControl[this.experienceProperties.StartDate].value,
      endDate: this.formControl[this.experienceProperties.EndDate].value,
      logoUrl: this.formControl[this.experienceProperties.LogoUrl].value,
      webUrl: this.formControl[this.experienceProperties.WebUrl].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }

    const theExperience = new Experience(experienceConstructor);

    console.log("*** Creating Experience");

    this.experienceService.createExperienceByPersonId(theExperience.getPerson.getId!, theExperience).subscribe({

      next: (data) => {
        // reseting the form after creation
        this.formGroup.reset();
        // reload entities
        const change: EntityChange = { change: true, entity: theExperience };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`Error. Create Experience addModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al crear Experiencia: ${errorMessage}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Create Experience complete");
        //close modal
        document.getElementById("modalAddExperienceClose")?.click()

        //scroll to the newly created Experience
        this.router.navigate(['/index'], { fragment: 'experience' });
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
