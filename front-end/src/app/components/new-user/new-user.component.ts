import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { PersonService } from '../../services/person.service';

import { PersonData, ResponseMessage } from '../../model/dataTypes';
import { Person } from '../../model/person';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {


  @Output() createUserEvent = new EventEmitter<boolean>;
  protected isPersonCreated: boolean = false;

  protected formGroup: FormGroup;

  protected person: Person = new Person();


  public constructor(protected formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private personService: PersonService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected createPersonEmit(created: boolean) {
    if (created) {
      this.createUserEvent.emit(created);
    }
  }


  protected onSubmit() {


    const personConstructor = {
      //setting id to 0 to create a new person instead of updating an existing one
      id: 0,
      name: this.formControl['name'].value,
      email: this.formControl['email'].value,
      password: this.formControl['password'].value,
    } as PersonData

    const thePerson = new Person(personConstructor);


    this.personService.createPerson(thePerson).subscribe({

      next: (res) => {
        const theMessage = res;
        console.log("Create person service, next: ", res.message);
        alert(theMessage.message);
        alert("Inicie sesión para ver sus datos y editarlos");
        this.formGroup.reset();
      },

      error: (err) => {
        // const theMessage: ResponseMessage = err.error;
        const theMessage: ResponseMessage = err.error;
        console.log("Error from Create person status: ", err.status);
        console.log("Error from Create person message: ", theMessage.message);
        alert(theMessage.message);

        this.isPersonCreated = false;

      },

      complete: () => {
        //now show the person
        this.isPersonCreated = true;
        this.createPersonEmit(this.isPersonCreated);

        //navigate to home
        this.router.navigate(['/index'], { fragment: 'start' });
      }

    });

    
  }


  protected validateForm(event: Event): void {

    event.preventDefault();

    if (this.formGroup.valid) {
      this.onSubmit();
    } else {
      this.formGroup.markAllAsTouched();
      alert("revisar campos");
    }

  }


  protected clearForm(): void {
    this.formGroup.reset();
  }


}
