import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

import { Data, DataWorksProjects } from '../../model/data';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {


  modoEdit: boolean = true;

  dWorks!: DataWorksProjects[];


  constructor(private db: DbService) {

  }


  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        const datos = data as Data
            this.dWorks = datos.works //as unknown as DataWorksProjects[]
            console.log(this.dWorks);
            
      }
    );


  }


}
