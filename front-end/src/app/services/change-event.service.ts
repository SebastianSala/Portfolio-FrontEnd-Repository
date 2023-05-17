import { EventEmitter, Injectable } from '@angular/core';

import { Person } from '../model/person';


@Injectable({
  providedIn: 'root'
})
export class ChangeEventService {


  public changedPerson: EventEmitter<Person> = new EventEmitter<Person>();

  // thePerson: Person = new Person();
  thePerson?: Person;


  constructor() {

  }


  public changePerson(person: Person): void {
    this.changedPerson.emit(person);
  }


}
