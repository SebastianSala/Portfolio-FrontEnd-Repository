import { EventEmitter, Injectable } from '@angular/core';

import { Person } from '../model/person';


@Injectable({
  providedIn: 'root'
})
export class ChangePersonService {


  public personChanged: EventEmitter<Person> = new EventEmitter<Person>();


  constructor() {

  }


  public changePerson(person: Person): void {
    this.personChanged.emit(person);
  }


}
