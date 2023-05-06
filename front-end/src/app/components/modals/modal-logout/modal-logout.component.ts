import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { PersonData } from 'src/app/model/data';

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
    
    sessionStorage.setItem("currentUser", JSON.stringify({}));
    // sessionStorage.setItem("currentUser", '{}');
    
    this.authenticationService.authenticatedUser = ({} as PersonData);
    console.log("From logout: ", this.authenticationService.authenticatedUser = ({} as PersonData));
    
    this.logged.emit(false);    
        
  }


}
