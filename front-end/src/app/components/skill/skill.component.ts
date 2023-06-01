import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ChangeEntityService } from '../../services/change-entity.service';
import { SkillService } from '../../services/skill.service';
import { Subscription } from 'rxjs';

import { Skill } from '../../model/skill';
import { EntityChange } from '../../model/dataTypes';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit, OnDestroy {


  @Input() isLogged: boolean = false;

  protected allSkills: Skill[] = [];
  protected skillToSend: Skill = new Skill();

  private skillSubscription?: Subscription;


  constructor(private skillService: SkillService, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {
    this.updateSkills();

  }


  ngOnInit(): void {
    this.getAllSkills();
  }

  ngOnDestroy(): void {
    this.skillSubscription?.unsubscribe();
  }


  private updateSkills(): void {

    this.skillSubscription = this.changeEntityService.entityChanged.subscribe({

      next: (res: EntityChange) => {
        if (res.entity instanceof Skill) {
          // console.log("updateSkills, is Skill type: ", res.entity);
          //reset the entity to send after using it
          this.skillToSend = new Skill();
          //reload the entities from the data base to show
          this.getAllSkills();
        } else {
          // console.log("updateSkill, not of type Skill: ", res.entity);
        }
      },

      error: (err: any) => {
        console.error("Error. UpdateSkill: ", err);
      }

    });

  }


  private getAllSkills(): void {


    console.info("*** Loading Skills");

    const personEmail = this.authenticationService.authenticatedUser.email;

    this.skillService.getSkillsByPersonEmail(personEmail).subscribe({

      next: (res) => {
        this.allSkills = res;
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Load skills: ", errorMessage, err.status);
        this.allSkills = [];
      },

      complete: () => {
        console.log("+++ Ok. Load Skills complete");

      }

    });

  }


  protected sendSkill(skill: Skill): void {
    this.skillToSend = skill;
  }


}