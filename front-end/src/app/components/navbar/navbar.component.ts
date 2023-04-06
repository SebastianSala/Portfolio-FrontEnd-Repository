import { Component, OnInit } from '@angular/core';
// import { Collapse } from 'bootstrap';
import { Collapse } from 'bootstrap';
import { EventHandlerService } from 'src/app/services/event-handler.service';

import { GlobalClick, globalClick } from 'src/app/model/GlobalClick';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {

  protected collapse!: Collapse;
  // menuOpen: boolean = false;
  menuOpen: GlobalClick = globalClick;

  constructor(private eventHandler: EventHandlerService) {

    // const collapseElement = document.getElementById('collapsibleNavbar');
    // this.collapse = new Collapse(collapseElement!, { toggle: false });

  }

  ngOnInit(): void {

    const collapseElement = document.getElementById('collapsibleNavbar');
    this.collapse = new Collapse(collapseElement!, { toggle: false });

    // this.eventHandler.parentEvent.subscribe((event: string) => {
      //   console.log(event);
      //   console.log("recibed from child");
      // });
      // this.eventHandler.parentEvent.subscribe(this.bodyClick);
      this.eventHandler.parentEvent.subscribe(this.bodyClick.bind(this));
      
  }


  // bodyClick(event: boolean) {
  bodyClick(event: any) {
    
    //this.menuOpen = event;
    console.log('event recived on child, bodyClicked method 1', event, this.menuOpen);
    
    if (this.menuOpen) {
      console.log('event recived on child, bodyClicked method 2', event, this.menuOpen);
      //this.menuOpen = !this.menuOpen;
       this.toggleMenu();
      // (this.toggleMenu as () => void).bind(new AppComponent())();
    }

  }
  
  public menuClicked() {
    
    // this.menuOpen.clickedMenu = !this.menuOpen.clickedMenu;
    // if(this.menuOpen) {
    //   console.log('menu open', this.menuOpen);
    //   this.eventHandler.parentEvent.emit(this.menuOpen);
    // }
    // console.log('menu clicked', this.menuOpen);
        
    this.toggleMenu();
  }


  toggleMenu(): void {

    // Check if the menu is currently expanded or not
    // const isExpanded = this.collapse._isTransitioning || this.collapse._isExpanded;

    //Togle the collapse menu
    this.collapse.toggle();
    console.log("toggle menu");
    
  }


}