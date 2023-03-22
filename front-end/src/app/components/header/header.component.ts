import { Component, OnInit } from '@angular/core';
// import { Collapse } from 'bootstrap';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected collapse!: Collapse;

  constructor() {

    // const collapseElement = document.getElementById('collapsibleNavbar');
    // this.collapse = new Collapse(collapseElement!, { toggle: false });

  }

  ngOnInit(): void {

    const collapseElement = document.getElementById('collapsibleNavbar');
    this.collapse = new Collapse(collapseElement!, { toggle: false });

  }


  toggleMenu(): void {

    // Check if the menu is currently expanded or not
    // const isExpanded = this.collapse._isTransitioning || this.collapse._isExpanded;

    //Togle the collapse menu
    this.collapse.toggle();
    console.log("toggle menu");
    
  }


}
