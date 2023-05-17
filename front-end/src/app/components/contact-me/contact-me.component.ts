import { Component, OnChanges, OnInit } from '@angular/core';

import { ChangeEventService } from '../../services/change-event.service';

import { Person } from '../../model/person';


@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {


  protected thePerson?: Person;


  constructor(private changeEvent: ChangeEventService) {

  }


  ngOnInit(): void {
    this.updatePerson();
  }


  private updatePerson() {


    this.changeEvent.changedPerson.subscribe({

      next: (res: Person) => {
        this.thePerson = res;
      },

      error: (err: any) => {
        console.log("Error. contactme updatePerson", err);
      }
      
    });


  }


}
