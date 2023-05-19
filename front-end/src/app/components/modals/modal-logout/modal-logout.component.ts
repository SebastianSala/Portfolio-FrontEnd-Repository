import { Component, EventEmitter, Output } from '@angular/core';

import { AuthenticationService } from '../../../services/authentication.service';

import { PersonData } from '../../../model/dataTypes';
import { Person } from '../../../model/person';


@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent {


  @Output() private logged = new EventEmitter<boolean>;


  constructor(private authenticationService: AuthenticationService) {

  }


  protected logout() {

    console.log("*** Loggin out");

    const currentUser = this.authenticationService.authenticatedUser;

    //setting the person that just logged out to view the portfolio in normal mode
    let personData = {
      email: currentUser.email,
      name: currentUser.name
    } as PersonData;

    const thePerson = new Person(personData);
    sessionStorage.setItem('currentUser', JSON.stringify(thePerson));

    this.authenticationService.authenticatedUser = personData;

    this.logged.emit(false);

  }


}
