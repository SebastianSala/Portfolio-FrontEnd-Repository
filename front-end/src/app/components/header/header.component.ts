import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Collapse } from 'bootstrap';
import { Collapse } from 'bootstrap';
import { EventHandlerService } from 'src/app/services/event-handler.service';

import { GlobalClick, globalClick } from 'src/app/model/GlobalClick';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected collapse!: Collapse;
  // menuOpen: boolean = false;
  menuOpen: GlobalClick = globalClick;

  protected hover: Array<boolean> = [];//[false, false, false];

  
  
  @Output() private logged = new EventEmitter<boolean>;
  isLogged: boolean = false;
  //modoEdit: boolean = true;
  
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

    this.menuOpen.clickedMenu = !this.menuOpen.clickedMenu;
    if (this.menuOpen) {
      console.log('menu open', this.menuOpen);
      this.eventHandler.parentEvent.emit(this.menuOpen);
    }
    console.log('menu clicked', this.menuOpen);

    this.toggleMenu();
  }


  toggleMenu(): void {

    // Check if the menu is currently expanded or not
    // const isExpanded = this.collapse._isTransitioning || this.collapse._isExpanded;

    //Togle the collapse menu
    this.collapse.toggle();
    console.log("toggle menu");

  }


  protected isHovering(id: number): void {
    // this.hover = !this.hover;
    switch (id) {
      case 1:
        this.hover[id] = !this.hover[id];
        break;

      case 2:
        this.hover[id] = !this.hover[id];
        break;

      case 3:
        this.hover[id] = !this.hover[id];
        break;

      case 4:
        this.hover[id] = !this.hover[id];
        break;

      case 5:
        this.hover[id] = !this.hover[id];
        break;

      default:
        break;
    }
  }


  protected loginState(isLogged: boolean): void {
    this.isLogged = isLogged;
    this.logged.emit(this.isLogged);
  }


}
