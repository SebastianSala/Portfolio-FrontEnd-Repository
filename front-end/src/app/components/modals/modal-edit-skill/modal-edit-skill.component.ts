import { Component, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { SkillService } from '../../../services/skill.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Skill } from '../../../model/skill';
import { SkillData, EntityChange, SkillProperties } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-edit-skill',
  templateUrl: './modal-edit-skill.component.html',
  styleUrls: ['./modal-edit-skill.component.scss']
})
export class ModalEditSkillComponent implements OnChanges {

  @Input() skillToEdit!: Skill;
  protected person: Person = new Person();
  protected skillProperties: typeof SkillProperties = SkillProperties;

  protected formGroup: FormGroup;



  public constructor(protected formBuilder: FormBuilder, private skillService: SkillService, private router: Router, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      level: ['100', [Validators.min(0), Validators.max(100)]],
      isTechnical: [''],
    })

  }


  ngOnChanges(): void {

    this.formGroup = this.formBuilder.group({
      name: [this.skillToEdit.getName, [Validators.required]],
      isTechnical: [this.skillToEdit.getIsTechnical, [Validators.required]],
      level: [this.skillToEdit.getLevel, [Validators.required]],
    });

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {

    const skillConstructor: SkillData = {
      // setting id to skillToEdit.getId to update an existing skill instead of creating a new one
      id: this.skillToEdit.getId!,
      name: this.formControl[this.skillProperties.Name].value,
      level: this.formControl[this.skillProperties.Level].value,
      isTechnical: this.formControl[this.skillProperties.IsTechnical].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }

    const theSkill = new Skill(skillConstructor);

    console.log("*** Editing Skill");

    this.skillService.updateSkillByPersonIdBySkillId(theSkill.getPerson.getId!, theSkill.getId!, theSkill).subscribe({

      next: (data) => {
        // reload entities
        const change: EntityChange = { change: true, entity: theSkill };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`Error. Edit Skill editModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al editar Habilidad: ${errorMessage}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Edit Skill complete");
        //close modal
        document.getElementById("modalEditSkillClose")?.click()

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
