import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PersonService } from '../../../services/person.service';

import { Person } from '../../../model/person';
import { PersonData } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-edit-about-me',
  templateUrl: './modal-edit-about-me.component.html',
  styleUrls: ['./modal-edit-about-me.component.scss']
})
export class ModalEditAboutMeComponent implements OnChanges {


  @Input() personToEdit?: Person;
  protected thePerson = new Person();

  @Output() editEvent = new EventEmitter<boolean>();
  protected isEdited: boolean = false;

  protected formGroup!: FormGroup;


  constructor(private personService: PersonService, protected formBuilder: FormBuilder) {

  }


  ngOnChanges(): void {

    this.formGroup = this.formBuilder.group({
      aboutMe: [this.personToEdit?.getAboutMe, [Validators.required]]
    })

    this.thePerson = this.personToEdit!;

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



    // const personConstructor = {
    //   //setting id to personToEdit.getId to update an existing person instead of creating a new one
    //   // id: this.personToEdit.getId!,
    //   id: this.thePerson.getId!,
    //   aboutMe: this.formControl['aboutMe'].value
    // } as PersonData;

    // const person = new Person(personConstructor);
    this.thePerson.setAboutMe = this.formControl['aboutMe'].value;

    // this.projectService.updateProjectByPersonIdByProjectId(theProject.getPerson.getId!, theProject.getId!, theProject).subscribe({
    // this.personService.updatePersonById(person.getId!, person).subscribe({
    this.personService.updatePersonById(this.thePerson.getId!, this.thePerson).subscribe({

      next: (res) => {
        alert(res.message);
      },

      error: (err) => {
        const message = err.error.message;
        console.log(`Error from edit AboutMe editModal: ${message}, Status: ${err.status}`,);
        alert(message)
        this.isEdited = false;

      },

      complete: () => {
        //reload and show all projects
        this.isEdited = true;
        this.editEmit(this.isEdited);
        //close modal
        document.getElementById("modalEditClose")?.click()
      }

    });

  }


  protected editEmit(edited: boolean) {
    if (edited) {
      this.editEvent.emit(edited);
    }
  }


}

