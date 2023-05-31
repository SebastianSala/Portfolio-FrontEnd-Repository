import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { SkillService } from '../../../services/skill.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Skill } from '../../../model/skill';
import { SkillData, EntityChange, SkillProperties } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-add-skill',
  templateUrl: './modal-add-skill.component.html',
  styleUrls: ['./modal-add-skill.component.scss']
})
export class ModalAddSkillComponent {


  protected formGroup: FormGroup;

  protected person: Person = new Person();
  protected skillProperties: typeof SkillProperties = SkillProperties;


  public constructor(protected formBuilder: FormBuilder, private skillService: SkillService, private router: Router, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      level: ['100', [Validators.min(0), Validators.max(100)]],
      isTechnical: [''],
    })

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {

    const skillConstructor: SkillData = {
      //setting id to 0 to create a new skill instead of updating an existing one
      id: 0,
      name: this.formControl[this.skillProperties.Name].value,
      level: this.formControl[this.skillProperties.Level].value,
      isTechnical: this.formControl[this.skillProperties.IsTechnical].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }

    const theSkill = new Skill(skillConstructor);

    console.log("*** Creating Skill");

    this.skillService.createSkillByPersonId(theSkill.getPerson.getId!, theSkill).subscribe({

      next: (data) => {
        // reload entities
        const change: EntityChange = { change: true, entity: theSkill };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`Error. Create Skill addModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al crear Habilidad: ${errorMessage}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Create Skill complete");
        //close modal
        document.getElementById("modalAddSkillClose")?.click()

        //scroll to the newly created Skill
        this.router.navigate(['/index'], { fragment: 'skill' });
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
