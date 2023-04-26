import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { DbService } from '../../services/db.service';
import { PersonService } from '../../services/person.service';

import { PersonData } from '../../model/data';
import { Person } from '../../model/person';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  // data: any;
  data?: Person[];
  dataAbout: any;

  thePerson?: Person;

  personData?: PersonData;
  // personData?: any;


  modoEdit: boolean = true;


  constructor(private personService: PersonService) {//private db: DbService) {
  }

  ngOnInit(): void {

    this.getPerson();

    // this.db.getData().subscribe(
    //   data => {
    //     this.data = data;
    //     this.dataAbout = data.about;
    //   }
    // );

    // this.personService.getPerson().subscribe(
    //   data => {
    //     this.data = data;
    //     console.log("Persons Data from endpoint: ", this.data);
    //     // this.personData!.aboutMe = data[0].AboutMe;
    //     // console.log("First Person Data from endpoint: ", this.personData);

    //     // this.dataAbout = this.personData?.aboutMe;
    //     // console.log("Data from aboutMe: ", this.dataAbout);

    //     // // this.dataAbout = this.dataAbout.split(".");
    //     // // this.dataAbout = data[0].aboutMe;
    //     // console.log("splitted aboutMe data: ", this.dataAbout);
    //   }
    // );

  }


  public getPerson(): void {

    this.personService.getPersonById(1).subscribe(
      data => {
        console.log("raw data", data);
        
        let localData: PersonData = data as unknown as PersonData;
        console.log("locaData as PersonData interface", localData);

        this.thePerson = new Person(localData.id, localData.name, localData.title, localData.email, localData.password, localData.location, localData.aboutMe, localData.imgUrl, localData.imgBackUrl, localData.webUrl);
        // this.thePerson = Object.assign({}, data);
        this.thePerson.setId = (data as unknown as PersonData).id;
        console.log("constructor multiple", this.thePerson);
        
        let thePerson2 = new Person(data as unknown as PersonData);
        console.log("with only one object constructor", thePerson2);
        
        // this.thePerson = data;
        
        // this.thePerson.setId = data.getId;
        // this.thePerson = new Person(data as unknown as PersonData);
        // console.log("Person from endpoint: ", data.getAboutMe);
        // console.log("about me: ", this.thePerson.aboutMe);
        
        // console.log("Data, about me  : ", data.aboutMe);
        // this.thePerson.aboutMe = data.aboutMe;
        thePerson2.setAboutMe="hola";
        console.log("Person from endpoint: ", thePerson2);
        console.log("about me 2 : ", thePerson2.getAboutMe);
        
      }
    );

  }


}
