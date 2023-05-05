import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent {


  @Output() private logged = new EventEmitter<boolean>;


  protected logout() {
    console.log("---------loggin out----------");
    
    sessionStorage.clear();
    // sessionStorage.setItem("currentUser2", JSON.stringify({}));
    
    this.logged.emit(false);    
        
  }


}
