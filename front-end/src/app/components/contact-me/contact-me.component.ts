import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChangePersonService } from '../../services/change-person.service';

import { Person } from '../../model/person';


@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnDestroy {


  protected thePerson?: Person;
  personSubscription?: Subscription;


  constructor(private changePerson: ChangePersonService) {

    this.personSubscription = this.changePerson.personChanged.subscribe({

      next: (res: Person) => {
        this.thePerson = res;
      },

      error: (err: any) => {
        console.log("Error. contactme updatePerson", err);
      }

    });

  }


  ngOnDestroy(): void {
    this.personSubscription?.unsubscribe();
  }


}
