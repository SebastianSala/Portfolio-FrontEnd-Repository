import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { PersonData } from '../../../model/data';
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
    console.log("---------loggin out----------");
    
    //sessionStorage.clear();
    // sessionStorage.setItem("currentUser2", JSON.stringify({}));
    // this.authenticationService.currentUserSubject = new BehaviorSubject<PersonData>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    // this.authenticationService.currentUserSubject = new BehaviorSubject(JSON.parse('{}'));
    // this.authenticationService.currentUserSubject = new BehaviorSubject({} as PersonData);
    
    
    // sessionStorage.setItem("currentUser", JSON.stringify({}));
    // // sessionStorage.setItem("currentUser", '{}');
    
    // this.authenticationService.authenticatedUser = ({} as PersonData);
    // console.log("From logout: ", this.authenticationService.authenticatedUser = ({} as PersonData));
    
    
    const currentUser = this.authenticationService.authenticatedUser;    
    console.log("From logout: ", this.authenticationService.authenticatedUser);
    
    let personData = {
      //id: response.id,
      email: currentUser.email,
      name: currentUser.name
    } as PersonData;
    
    const thePerson = new Person(personData);
    sessionStorage.setItem('currentUser', JSON.stringify(thePerson));
    
    this.authenticationService.authenticatedUser = (personData);    
    // this.currentUserSubject.next(personData);
    console.log("From logout: ", this.authenticationService.authenticatedUser);

    
    this.logged.emit(false);    
        
  }


}
