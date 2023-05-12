import { Component, OnInit } from '@angular/core';

import { DbService } from './../../services/db.service';

import { Data, DataSkills } from '../../model/dataTypes';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  modoEdit: boolean = true;
  hardSkills: any;
  softSkills: any;
  skills?: DataSkills;

  constructor(private db: DbService) {

  }

  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        const lData: Data = data as Data;
        this.skills = lData.skills;
      },
      error => console.error("Error in Skills, error")      
    )

  }

}
