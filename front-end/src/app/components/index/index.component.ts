import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { PersonService } from '../../services/person.service';
import { ChangePersonService } from '../../services/change-person.service';

import { PersonData } from '../../model/dataTypes';
import { Person } from '../../model/person';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnChanges {


  isLogged: boolean = false;
  user?: PersonData;

  thePerson: Person = new Person();
  //if no other user logs in, this is the first person to show on the page, Sebastian Sala, since this is the owner of the site.
  firstPerson: PersonData = {
    email: "sebastiansala.dev@gmail.com"
  } as PersonData


  constructor(private router: Router, private personService: PersonService,
    private authenticationService: AuthenticationService,
    private changePersonService: ChangePersonService) {

  }


  ngOnInit(): void {
    this.checkLogin();
    this.getFirstPerson(this.firstPerson.email);
  }

  ngOnChanges(): void {
    this.checkLogin();
    this.getFirstPerson(this.firstPerson.email);
  }


  ngAfterViewInit(): void {
    this.router.navigate(['/index'], { fragment: 'start' });
  }


  protected loginState(login: boolean): void {

    console.log("*** Loading");
    

    let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser")!);

    if (login) {
      this.personService.getPersonByEmail(user.email).subscribe({

        // Loading the person to show
        next: (res) => {
          this.thePerson = res;
          // emiting the person loaded
          this.changePersonService.changePerson(res);
        },
        error: (err) => {
          console.log("--- Error. Login State: ", err.error.message);
        },
        complete: () => {

          sessionStorage.setItem('currentUser', JSON.stringify(this.thePerson));
          this.authenticationService.authenticatedUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

          if (user && user.id) {

            this.isLogged = true;
            this.setFirstPerson(user.email);

            console.log("+++ Ok. Logged in");

          } else {
            this.isLogged = false;
          }

        }

      });

    } else {
      //this is log out, needs to reload

      if (user && user.id) {
        // In the case is was not log out but page reload
        this.isLogged = true;
        this.setFirstPerson(user.email);

        console.log("+++ Ok. Logged in");
        
      } else {
        
        console.log("+++ Ok. Logged out");

        this.isLogged = false;
        this.setFirstPerson(user.email);
        //navigating to index and top when loggin out
        this.router.navigate(['/index'], { fragment: 'start' });      

      }

    }
  }


  private checkLogin(): void {


    let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser")!);

    if (user && user.id) {

      this.isLogged = true;
      //set to load the person from currentUser if it has logged in
      this.setFirstPerson(user.email);

    } else {


      this.isLogged = false;

      if (user && user.email) {
        //if logged out, show the data of the person that has just finished editing the portfolio
        this.setFirstPerson(user.email);

      } else {
        //if there is no email set in current user, it means its the first load of the site, so set the default user to show to Sebastian Sala, since its the owner of the portfolio
        let personData = {
          //id: response.id,
          email: this.firstPerson.email,
          name: this.firstPerson.name
        } as PersonData;

        const tempPerson = new Person(personData);
        sessionStorage.setItem('currentUser', JSON.stringify(tempPerson));

        this.authenticationService.authenticatedUser = (personData);

      }


    }


  }

  setFirstPerson(email: string): void {
    // this is the first person that will load in the portfolio regardles of login
    this.firstPerson.email = email;
  }


  getFirstPerson(email: string) {

    console.log("*** Loading Person");
    

    this.personService.getPersonByEmail(email).subscribe({

      next: (res) => {
        //reseting the person so it has no garbage data
        this.thePerson = new Person();
        //assignin the person to show
        this.thePerson = res;
        // emiting the person loaded
        this.changePersonService.changePerson(this.thePerson);
      },
      error: (err) => {
        const message = err.error.message ?? err
        console.log("--- Error. getFirstPerson: ", message);
      },
      complete: () => {
        //once the person is retrived from the backend, navigato to index to see it.
        this.router.navigate(['/index'], { fragment: 'start' });
        console.log("+++ Ok. Load Person complete");
      }

    });

  }


}
