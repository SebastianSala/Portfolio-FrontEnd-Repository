import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { PersonService } from '../../services/person.service';

import { PersonData, ResponseMessage } from '../../model/dataTypes';
import { Person } from '../../model/person';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {


  protected person: Person = new Person();


  public constructor(private router: Router, private authenticationService: AuthenticationService, private personService: PersonService) {

  }


  protected deleteUser() {

    console.info("*** Deleting person");

    const theUser: PersonData = JSON.parse(sessionStorage.getItem("currentUser")!);

    this.personService.deletePersonById(theUser.id).subscribe({

      next: (res) => {
        const theMessage = res;
        console.log("+++ Ok. Delete person: ", res.message);
        alert(`${theMessage.message} ${theUser.name} ${theUser.email}`);
      },

      error: (err) => {
        const theMessage: ResponseMessage = err.error;
        console.error("--- Error. Delete person status: ", err.status);
        console.error("--- Error. Delete person message: ", theMessage.message);
        alert(theMessage.message);

        // this.isPersonCreated = false;
      },

      complete: () => {
        console.info("*** Ok. Delete person complete");

        // Reset the Person to the portfolio owner
        this.logout();

        //navigate to home
        this.router.navigate(['/index'], { fragment: 'start' });
      }

    });


  }


  protected logout() {

    console.log("*** Loggin out");
    // const currentUser = this.authenticationService.authenticatedUser;

    // setting the person to the owner of the portfolio
    let personData = {
      email: "sebastiansala.dev@gmail.com",
      name: ""
    } as PersonData;

    const thePerson = new Person(personData);
    sessionStorage.setItem('currentUser', JSON.stringify(thePerson));

    this.authenticationService.authenticatedUser = personData;

    // new log in check
    this.authenticationService.setUserIsLogged = false;

  }



}
