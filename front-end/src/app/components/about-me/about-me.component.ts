import { Component, Input, OnChanges } from '@angular/core';

import { Person } from '../../model/person';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnChanges {


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


  public splitAboutMe(): void {

    this.aboutMeSplit = this.localPerson?.getAboutMe;
    console.log(this.aboutMeSplit);
    
    if(this.aboutMeSplit) {
      this.aboutMeSplit = this.aboutMeSplit.trim();
      this.aboutMeArray = this.aboutMeSplit.split("/");
      console.log(this.aboutMeSplit);
      console.log(this.aboutMeArray);
    }

  }


}
