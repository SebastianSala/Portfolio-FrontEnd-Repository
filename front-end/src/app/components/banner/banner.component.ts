import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Person } from '../../model/person';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges {

  @Output() changed = new EventEmitter<boolean>();

  @Input() isLogged: boolean = false;
  @Input() thePerson?: Person;
  localPerson?: Person;


  constructor() {

  }


  ngOnChanges() {
    this.localPerson = this.thePerson;
  }


  protected reloadPerson(event: boolean) {
    this.changed.emit(event);
  }
  

}
