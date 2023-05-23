import { Component, OnDestroy, OnInit } from '@angular/core';

import { ChangePersonService } from '../../services/change-person.service';

import { Person } from '../../model/person';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  
  protected thePerson?: Person;
  protected person$: Observable<Person>;
  personSubscription?: Subscription;


  constructor(private changePersonService: ChangePersonService) {
    this.person$ = this.changePersonService.personChanged;
    this.thePerson = new Person(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }


  ngOnInit(): void {
    this.updatePerson();
  }


  private updatePerson() {

    this.personSubscription = this.changePersonService.personChanged.subscribe({
      next: (res: Person) => {
        this.thePerson = res;
      },

      error: (err: any) => {
        console.log("Error. footer, updatePerson: ", err);
        
      }

    });

  }


  ngOnDestroy(): void {
    // Unsubscribing to avoid memory leakeages
    this.personSubscription?.unsubscribe();
  }


}
