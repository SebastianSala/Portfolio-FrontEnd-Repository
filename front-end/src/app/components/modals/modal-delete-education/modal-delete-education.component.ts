import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EducationService } from '../../../services/education.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Education } from '../../../model/education';


@Component({
  selector: 'app-modal-delete-education',
  templateUrl: './modal-delete-education.component.html',
  styleUrls: ['./modal-delete-education.component.scss']
})
export class ModalDeleteEducationComponent {


  @Input() educationToDelete!: Education;


  constructor(private educationService: EducationService, private router: Router, private changeEntityService: ChangeEntityService) {

  }


  deleteEducation(): void {

    console.log("*** Deleting Education");

    this.educationService.deleteEducationByPersonIdByEducationId(this.educationToDelete.getPerson.getId as number, this.educationToDelete.getId as number).subscribe({

      next: (res) => {
        console.log(res.message);
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error("--- Error. Delete education method in deleteModal: ", errorMessage);
        alert(errorMessage);
      },

      complete: () => {
        // reload entities
        this.changeEntityService.changeEntity({ change: true, entity: this.educationToDelete });
        console.log("+++ Ok. Delete education complete!");

        this.router.navigate(['/index'], { fragment: 'education' });
      }
    });

  }


}
