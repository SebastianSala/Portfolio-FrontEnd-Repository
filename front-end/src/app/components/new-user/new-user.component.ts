import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from '../../model/person';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { PersonData, ResponseMessage } from '../../model/data';
import { PersonService } from '../../services/person.service';

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
      console.log("Emiting from modal add: ", created);
      this.createUserEvent.emit(created);
    }
  }


  protected onSubmit() {


    const personConstructor = {
      // const projectConstructor = {
      //setting id to 0 to create a new project instead of updating an existing one
      id: 0,
      name: this.formControl['name'].value,
      email: this.formControl['email'].value,
      password: this.formControl['password'].value,      
    } as PersonData

    //set the person to the only person relevant for this portfolio project
    //but the backend allows creation of multiple persons with its corresponding projects, experiences, etc and proper relationships between them.
    // projectConstructor.person.setId = 1;        
    // personConstructor.person.setId = this.authenticationService.authenticatedUser.id;

    const thePerson = new Person(personConstructor);

    this.personService.createPerson(thePerson).subscribe({

      next: (res) => {
        // const message = data as ResponseMessage;
        const theMessage: ResponseMessage = res;
        console.log("the return of create: ", res.message);
        alert(theMessage.message);
        alert("Inicie sesión para ver sus datos y editarlos");
        this.formGroup.reset();
      },

      error: (err) => {
        const theMessage: ResponseMessage = err.error;
        console.log("Error from Create person status: ", err.status);
        // console.log("Error from Create person message: ", err.error.message);
        console.log("Error from Create person message: ", theMessage.message);
        alert(theMessage.message);
        
        this.isPersonCreated = false;

      },

      complete: () => {
        //reload and show all projects
        this.isPersonCreated = true;
        this.createPersonEmit(this.isPersonCreated);

        //navigate to home
        this.router.navigate(['/index'], { fragment: 'start' });
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
