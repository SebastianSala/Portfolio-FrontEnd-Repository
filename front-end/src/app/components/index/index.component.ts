import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonData } from '../../model/data';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnChanges {

  
  isLogged: boolean = false;
  user?: PersonData ;


  constructor(private router: Router) {
    
  }


  ngOnInit(): void {

    this.router.navigate(['/index'], { fragment: 'start' });

    this.checkLogin();
    // this.db.getData().subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // );

  }


  ngOnChanges(): void {
    this.checkLogin();
  }


  protected loginState(isLogged: boolean): void {
    // this.isLogged = isLogged;
    this.checkLogin();
  }


  private checkLogin(): void {
    // let personData = {
    //   id: response.body?.getId,
    //   email: response.body?.getEmail      
    // } as PersonData;
    // this.personLogin = new Person(personData);
    
    let user: PersonData = JSON.parse(sessionStorage.getItem("currentUser2")!);
    // console.log("the data from currentUser2: ", user, user.id, user.email);
    
    // if (user && user.id) {
    if (user) {
      this.isLogged = true;
      console.log("------------------------------------ TRUE log from checkLogin", user);
      
    } else {
      this.isLogged = false;
      console.log("------------------------------------ FALSE log from checkLogin", user);
    }

    // console.log("loggin userData: ", user.id, user.email);
    // sessionStorage.setItem("currentUser2", JSON.stringify(this.personLogin))
    // let userId = sessionStorage.getItem("id");
  }


}
