import { Component, OnInit } from '@angular/core';
import { EventHandlerService } from './services/event-handler.service';

import { GlobalClick, globalClick } from './model/GlobalClick';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // parentMenuOpen: boolean = false;
  parentMenuOpen: GlobalClick = globalClick;
  
  constructor(private eventHandler: EventHandlerService) {}

  ngOnInit(): void {
    this.eventHandler.parentEvent.emit(this.parentMenuOpen);
    this.eventHandler.parentEvent.subscribe(this.parentBodyClick.bind(this));
    console.log("FIRST emited from parent");
  }

  onClick() {
    this.eventHandler.parentEvent.emit(this.parentMenuOpen);
    console.log("onClick, emited from parent", this.parentMenuOpen);
    
  }

  parentBodyClick(event: any) {

    console.log('parent, bodyClicked method 1', event, this.parentMenuOpen);
    this.parentMenuOpen = event;
    console.log('parent, bodyClicked method 1', event, this.parentMenuOpen);
    
    if (this.parentMenuOpen) {
      console.log('parent, bodyClicked method 2', event, this.parentMenuOpen);
      this.parentMenuOpen.clickedBody = !this.parentMenuOpen.clickedBody;
      //this.toggleMenu();
      // (this.toggleMenu as () => void).bind(new AppComponent())();
      //this.eventHandler.parentEvent.emit(true);
    }

  }

}
