import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { PersonService } from '../../services/person.service';
import { ChangePersonService } from '../../services/change-person.service';

import { PersonData } from '../../model/dataTypes';
import { Person } from '../../model/person';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http/index';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnChanges {

  isLoading = false;
  serverFail = false;
  userLogged = false;
  userLogSubscription?: Subscription;

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

    // checking for logged in state and assigning the subscription to a variable to unsubscribe later
    this.userLogSubscription = this.authenticationService.getUserIsLogged$.subscribe({
      next: (loggedState) => {
        this.userLogged = loggedState;
        console.log("user is logged in: ", this.userLogged);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.info("log complete");
      }
    });

  }

  ngOnChanges(): void {
    this.checkLogin();
    this.getFirstPerson(this.firstPerson.email);
  }


  ngAfterViewInit(): void {
    this.router.navigate(['/index'], { fragment: 'start' });
  }

  ngOnDestroy(): void {
    // Unsubscribing for good practice
    this.userLogSubscription?.unsubscribe();
  }


  protected loginState(login: boolean): void {

    console.log("*** Loading");


    let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser")!);

    this.isLoading = true;
    if (login) {
      this.personService.getPersonByEmail(user.email).subscribe({

        // Loading the person to show
        next: (res) => {
          this.thePerson = res;
          // emiting the person loaded
          this.changePersonService.changePerson(res);
        },
        error: (err) => {
          const errorMessage = err.error.message ?? err.error ?? err;
          console.error("--- Error. Login State: ", errorMessage, err.status);
        },
        complete: () => {

          sessionStorage.setItem('currentUser', JSON.stringify(this.thePerson));
          this.authenticationService.authenticatedUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

          if (user && user.id) {

            this.isLogged = true;
            this.setFirstPerson(user.email);

            console.info("+++ Ok. Logged in");

            // window.location.reload();

          } else {
            this.isLogged = false;
          }

          this.isLoading = false;
        }


      });

    } else {
      //this is log out, needs to reload

      if (user && user.id) {
        // In the case is was not log out but page reload
        this.isLogged = true;
        this.setFirstPerson(user.email);

        console.info("+++ Ok. Logged in");

      } else {

        console.info("+++ Ok. Logged out");

        this.isLogged = false;
        this.setFirstPerson(user.email);
        //navigating to index and top when loggin out
        this.router.navigate(['/index'], { fragment: 'start' });

      }

      this.isLoading = false;

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

    this.isLoading = true;

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
        // Check to se if the error is comming from the backend methods or it could not reach the server and is a generic error
        // const errorMessage = err.error.message ?? err.error ?? err;
        const errorMessage = (err.error.hasOwnProperty('message')) ? err.error.message : "";
        console.error("--- Error. getFirstPerson: ", errorMessage, err.status);
        if (errorMessage != "") alert(errorMessage);

        this.isLoading = false;
        this.serverFail = true;
      },
      complete: () => {
        //once the person is retrived from the backend, navigato to index to see it.
        this.router.navigate(['/index'], { fragment: 'start' });
        console.log("+++ Ok. Load Person complete");

        this.isLoading = false;
        this.serverFail = false;
      }

    });

  }


}
