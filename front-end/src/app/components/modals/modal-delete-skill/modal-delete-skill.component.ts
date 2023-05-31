import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SkillService } from '../../../services/skill.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Skill } from '../../../model/skill';


@Component({
  selector: 'app-modal-delete-skill',
  templateUrl: './modal-delete-skill.component.html',
  styleUrls: ['./modal-delete-skill.component.scss']
})
export class ModalDeleteSkillComponent {


  @Input() skillToDelete!: Skill;


  constructor(private skillService: SkillService, private router: Router, private changeEntityService: ChangeEntityService) {

  }


  deleteSkill(): void {

    console.log("*** Deleting Skill");

    this.skillService.deleteSkillByPersonIdBySkillId(this.skillToDelete.getPerson.getId as number, this.skillToDelete.getId as number).subscribe({

      next: (res) => {
        console.log(res.message);
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Delete skill method in deleteModal: ", errorMessage);
        alert(errorMessage);
      },

      complete: () => {
        // reload entities
        this.changeEntityService.changeEntity({ change: true, entity: this.skillToDelete });
        console.log("+++ Ok. Delete skill complete!");

        this.router.navigate(['/index'], { fragment: 'skill' });
      }
    });

  }


}
