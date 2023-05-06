import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonData } from '../../model/data';
import { Person } from '../../model/person';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Output() private logged = new EventEmitter<boolean>;
  @Input() isLogged: boolean = false;
  
  @Input() thePerson?: Person;
  localPerson?: Person;

  protected theName?: string;

  protected hover: Array<boolean> = []


  constructor() {

  }


  ngOnInit(): void {
    // this.getNameSessionStorage();
    this.getNameInputVariable();
  }

  ngOnChanges() {
    this.localPerson = this.thePerson;
    // this.getNameInputVariable();
  }


  private getName(): void {

    const tempName: PersonData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

    this.theName = (tempName && tempName.name
      ? tempName.name
      : '');

  }
  

  private getNameInputVariable(): void {

    let tempName: string = this.thePerson?.getName || "Nombre";
    this.theName = tempName;

  }

  
  protected isHovering(id: number): void {
    // this.hover = !this.hover;
    switch (id) {
      case 1:
        this.hover[id] = !this.hover[id];
        break;

      case 2:
        this.hover[id] = !this.hover[id];
        break;

      case 3:
        this.hover[id] = !this.hover[id];
        break;

      case 4:
        this.hover[id] = !this.hover[id];
        break;

      case 5:
        this.hover[id] = !this.hover[id];
        break;

      default:
        break;
    }
  }


  protected loginState(isLogged: boolean): void {
    this.logged.emit(isLogged);
  }


}
