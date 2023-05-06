import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonData } from '../../model/data';
import { Person } from '../../model/person';
import { PersonService } from '../../services/person.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {


  isLogged: boolean = false;
  user?: PersonData;

  thePerson: Person = new Person();
  firstPerson: PersonData = {
    email: "sebastiansala.dev@gmail.com"
  } as PersonData


  constructor(private router: Router, private personService: PersonService, private authenticationService: AuthenticationService) {

  }


  ngOnInit(): void {
    this.checkLogin();
    this.getFirstPerson(this.firstPerson.email);
  }


  ngAfterViewInit(): void {
    this.router.navigate(['/index'], { fragment: 'start' });
  }


  protected loginState(event: boolean): void {
    if (event) {
      let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser")!);
      this.personService.getPersonByEmail(user.email).subscribe({

        next: (res) => {
          this.thePerson = res;
        },
        error: (err) => {
          console.log("Error from login State: ", err);
        },
        complete: () => {

          sessionStorage.setItem('currentUser', JSON.stringify(this.thePerson));
          this.authenticationService.authenticatedUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');


        }

      })

    } else {
      //this is log out, needs to reload
      console.log("False from login State");
      alert("false from login state")
    }
  }


  private checkLogin(): void {

    let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser")!);

    if (user && user.id) {
      this.isLogged = true;
      this.setFirstPerson(user.email);
    } else {
      this.isLogged = false;
    }
  }


  setFirstPerson(email: string): void {

    // console.log("the firstPerson and email: ", this.firstPerson, this.firstPerson.email);

    // this.firstPerson.email = JSON.parse(sessionStorage.getItem('email') || JSON.stringify(this.firstPerson));
    // this.firstPerson.email = JSON.parse(sessionStorage.getItem('email') || '{}').email;
    console.log("the firstPerson and email: ", this.firstPerson, this.firstPerson.email);
    this.firstPerson.email = email;
    // console.log("the firstPerson and email: ", this.firstPerson, this.firstPerson.email);
    console.log("the firstPerson and email: ", this.firstPerson, this.firstPerson.email);
  }


  getFirstPerson(email: string) {
    this.personService.getPersonByEmail(email).subscribe({
      next: (res) => {
        this.thePerson = res;
        console.log("The first Person to load is: ", this.thePerson);
      },
      error: (err) => {
        console.log("Error from getFirstPerson: ", err);
      },
      complete: () => {
        this.router.navigate(['/index'], { fragment: 'start' });
      }
    })
  }


}
