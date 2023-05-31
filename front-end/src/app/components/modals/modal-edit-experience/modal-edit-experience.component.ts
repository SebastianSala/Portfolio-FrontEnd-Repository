import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExperienceService } from '../../../services/experience.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Experience } from '../../../model/experience';
import { ExperienceData, EntityChange, ExperienceProperties } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-edit-experience',
  templateUrl: './modal-edit-experience.component.html',
  styleUrls: ['./modal-edit-experience.component.scss']
})
export class ModalEditExperienceComponent {

  @Input() experienceToEdit!: Experience;
  protected person: Person = new Person();

  protected formGroup: FormGroup;


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


  ngOnChanges(): void {

    this.formGroup = this.formBuilder.group({
      position: [this.experienceToEdit.getPosition, [Validators.required]],
      description: [this.experienceToEdit.getDescription, [Validators.required]],
      company: [this.experienceToEdit.getCompany, [Validators.required]],
      startDate: [this.experienceToEdit.getStartDate, [Validators.required]],
      endDate: [this.experienceToEdit.getEndDate, [Validators.required]],
      logoUrl: [this.experienceToEdit.getLogoUrl],
      webUrl: [this.experienceToEdit.getWebUrl],
    });

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {

    const experienceConstructor: ExperienceData = {
      // setting id to experienceToEdit.getId to update an existing experience instead of creating a new one
      id: this.experienceToEdit.getId!,
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

    console.info("*** Editing Experience");

    this.experienceService.updateExperienceByPersonIdByExperienceId(theExperience.getPerson.getId!, theExperience.getId!, theExperience).subscribe({

      next: (data) => {
        // reload entities
        const change: EntityChange = { change: true, entity: theExperience };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`Error. Edit Experience editModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al editar Experiencia: ${errorMessage}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Edit Experience complete");
        //close modal
        document.getElementById("modalEditExperienceClose")?.click()

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
