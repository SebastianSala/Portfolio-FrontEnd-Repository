import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ExperienceService } from '../../services/experience.service';
import { ChangeEntityService } from '../../services/change-entity.service';

import { Experience } from '../../model/experience';
import { Subscription } from 'rxjs';
import { EntityChange } from '../../model/dataTypes';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {


  @Input() isLogged: boolean = false;

  protected allExperiences: Experience[] = [];
  protected experienceToSend: Experience = new Experience();

  private experienceSubscription?: Subscription;


  constructor(private experienceService: ExperienceService, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {
    this.updateExperiences();

  }


  ngOnInit(): void {
    this.getAllExperiences();
  }

  ngOnDestroy(): void {
    this.experienceSubscription?.unsubscribe();
  }


  private updateExperiences(): void {

    this.experienceSubscription = this.changeEntityService.entityChanged.subscribe({

      next: (res: EntityChange) => {
        if (res.entity instanceof Experience) {
          // console.log("updateExperiences, is Experience type: ", res.entity);
          //reset the entity to send after using it
          this.experienceToSend = new Experience();
          //reload the entities from the data base to show
          this.getAllExperiences();
        } else {
          // console.log("updateExperience, not of type Experience: ", res.entity);
        }
      },

      error: (err: any) => {
        console.error("Error. UpdateExperience: ", err);
      }

    });

  }


  private getAllExperiences(): void {


    console.info("*** Loading Experiences");

    const personEmail = this.authenticationService.authenticatedUser.email;

    this.experienceService.getExperiencesByPersonEmail(personEmail).subscribe({

      next: (res) => {
        this.allExperiences = res;
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Load experiences: ", errorMessage, err.status);
      },

      complete: () => {
        console.log("+++ Ok. Load Experiences complete");

      }

    });

  }


  protected sendExperience(experience: Experience): void {
    this.experienceToSend = experience;
  }


}
