import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Person } from '../../model/person';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnChanges {

  @Output() changed = new EventEmitter<boolean>();

  @Input() isLogged: boolean = false;

  @Input() thePerson?: Person;
  localPerson?: Person = new Person();

  aboutMeSplit: any = '';
  aboutMeArray?: string[];


  constructor() {

  }


  ngOnChanges(): void {
    this.localPerson = this.thePerson;
    this.splitAboutMe();
  }


  private splitAboutMe(): void {

    this.aboutMeSplit = this.localPerson?.getAboutMe;

    if (this.aboutMeSplit) {
      this.aboutMeSplit = this.aboutMeSplit.trim();
      // split the string by "." So every new paragraph is displayed with different alignment
      this.aboutMeArray = this.aboutMeSplit.split(".");
    }

  }


  protected reloadPerson(event: boolean) {
    this.changed.emit(event);
  }


}
