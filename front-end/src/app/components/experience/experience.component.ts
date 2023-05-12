import { Component, OnInit } from '@angular/core';

import { DbService } from '../../services/db.service';

import { Data, DataExperienceProjects } from '../../model/dataTypes';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {


  modoEdit: boolean = true;
  dExperience!: DataExperienceProjects[];


  constructor(private db: DbService) {

  }


  ngOnInit(): void {

    this.db.getData().subscribe(
      (data) => {
        const datos = data as Data;
        this.dExperience = datos.experience; //as unknown as DataWorksProjects[]
      }
      
    );

  }


}
