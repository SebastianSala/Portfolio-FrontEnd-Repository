import { Component, OnInit } from '@angular/core';
import { DbService } from './../../services/db.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  modoEdit: boolean = true;
  hardSkills: any;
  softSkills: any;

  constructor(private db: DbService) {

  }

  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        this.hardSkills = data.skills[0],
        this.softSkills = data.skills[1]
      },
      error => console.error("Error in Skills, error")      
    )

  }

}
