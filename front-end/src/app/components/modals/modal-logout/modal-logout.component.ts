import { Component, EventEmitter, Output } from '@angular/core';

import { AuthenticationService } from '../../../services/authentication.service';

import { PersonData } from '../../../model/dataTypes';
import { Person } from '../../../model/person';
import { TokenStorageService } from '../../../services/TokenStorage';


@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent {


  @Output() private logged = new EventEmitter<boolean>;


  constructor(private authenticationService: AuthenticationService, private tokenStorageService: TokenStorageService) {

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
    this.tokenStorageService.signOut();
    this.tokenStorageService.saveUser(thePerson);
    this.authenticationService.authenticatedUser = personData;

    // new log in check
    this.authenticationService.setUserIsLogged = false;

    this.logged.emit(false);

  }


}
