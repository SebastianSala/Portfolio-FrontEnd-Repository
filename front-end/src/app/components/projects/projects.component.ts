import { Component, OnInit } from '@angular/core';

import {DbService} from '../../services/db.service';

import { Data, DataExperienceProjects } from '../../model/data';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  
  modoEdit: boolean = true;
  dProjects!: DataExperienceProjects[];


  constructor(private db: DbService) {

  }


  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        const lData: Data = data as Data;
        this.dProjects = lData.Projects;
      }
    );

  }


}
