import { Component, OnInit } from '@angular/core';

import { ChangeEventService } from '../../services/change-event.service';

import { Person } from '../../model/person';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  
  protected thePerson?: Person;


  constructor(private changeEventService: ChangeEventService) {

  }


  ngOnInit(): void {
    this.updatePerson();
  }


  private updatePerson() {

    this.changeEventService.changedPerson.subscribe({
      next: (res: Person) => {
        this.thePerson = res;
      },

      error: (err: any) => {
        console.log("Error. footer, updatePerson: ", err);
        
      }

    });

  }


}
