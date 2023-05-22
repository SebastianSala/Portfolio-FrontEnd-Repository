import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ExperienceService } from '../../../services/experience.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Experience } from '../../../model/experience';

@Component({
  selector: 'app-modal-delete-experience',
  templateUrl: './modal-delete-experience.component.html',
  styleUrls: ['./modal-delete-experience.component.scss']
})
export class ModalDeleteExperienceComponent {


  @Input() experienceToDelete!: Experience;


  constructor(private experienceService: ExperienceService, private router: Router, private changeEntityService: ChangeEntityService) {

  }


  deleteExperience(): void {

    console.log("*** Deleting Experience");

    this.experienceService.deleteExperienceByPersonIdByExperienceId(this.experienceToDelete.getPerson.getId as number, this.experienceToDelete.getId as number).subscribe({

      next: (res) => {
        console.log(res.message);
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Delete experience method in deleteModal: ", errorMessage);
        alert(errorMessage);
      },

      complete: () => {
        // reload entities
        this.changeEntityService.changeEntity({ change: true, entity: this.experienceToDelete });
        console.log("+++ Ok. Delete experience complete!");

        this.router.navigate(['/index'], { fragment: 'experience' });
      }
    });

  }


}
