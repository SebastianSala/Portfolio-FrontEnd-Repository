import { Component, Input, OnChanges } from '@angular/core';

import { Person } from '../../model/person';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges {

  // modoEdit: boolean = true;
  @Input() isLogged: boolean = false;
  @Input() thePerson?: Person;
  localPerson?: Person;


  constructor() {

  }


  ngOnChanges() {
    this.localPerson = this.thePerson;
  }


}
