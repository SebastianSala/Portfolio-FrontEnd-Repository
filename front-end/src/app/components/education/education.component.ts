import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ChangeEntityService } from '../../services/change-entity.service';
import { EducationService } from '../../services/education.service';

import { Subscription } from 'rxjs';
import { EntityChange } from '../../model/dataTypes';
import { Education } from '../../model/education';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {


  @Input() isLogged: boolean = false;

  protected allEducations: Education[] = [];
  protected educationToSend: Education = new Education();

  private educationSubscription?: Subscription;


  constructor(private educationService: EducationService, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {
    this.updateEducations();

  }


  ngOnInit(): void {
    this.getAllEducations();
  }

  ngOnDestroy(): void {
    this.educationSubscription?.unsubscribe();
  }


  private updateEducations(): void {

    this.educationSubscription = this.changeEntityService.entityChanged.subscribe({

      next: (res: EntityChange) => {
        if (res.entity instanceof Education) {
          console.log("updateEducations, is Education type: ", res.entity);
          //reset the entity to send after using it
          this.educationToSend = new Education();
          //reload the entities from the data base to show
          this.getAllEducations();
        } else {
          console.log("updateEducation, not of type Education: ", res.entity);

        }
      },

      error: (err: any) => {
        console.error("Error. UpdateEducation: ", err);
      }

    });

  }


  private getAllEducations(): void {


    console.info("*** Loading Educations");

    const personEmail = this.authenticationService.authenticatedUser.email;

    this.educationService.getEducationsByPersonEmail(personEmail).subscribe({

      next: (res) => {
        this.allEducations = res;
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Load educations: ", errorMessage, err.status);
      },

      complete: () => {
        console.log("+++ Ok. Load Educations complete");

      }

    });

  }


  protected sendEducation(education: Education): void {
    this.educationToSend = education;
  }


}
