import { Component, Input, OnInit } from '@angular/core';

import { Collapse } from 'bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @Input() isLogged: boolean = false;
  protected collapse!: Collapse;


  constructor() {

  }


  ngOnInit(): void {

    const collapseElement = document.getElementById('collapsibleNavbar');
    this.collapse = new Collapse(collapseElement!, { toggle: false });

  }


  protected menuClick() {
    document.getElementById('menu-toggler')?.click();
  }


}