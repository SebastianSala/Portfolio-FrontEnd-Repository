import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Person } from '../../model/person';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {


  @Output() private logged = new EventEmitter<boolean>;
  @Input() isLogged: boolean = false;

  @Input() thePerson?: Person;
  localPerson?: Person;

  protected theName?: string;

  protected hover: Array<boolean> = []


  constructor() {

  }


  ngOnChanges() {
    this.localPerson = this.thePerson;
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
    this.logged.emit(isLogged);
  }


}
