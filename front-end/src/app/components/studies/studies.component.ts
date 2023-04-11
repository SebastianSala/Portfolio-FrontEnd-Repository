import { Component, OnInit } from '@angular/core';

import { DbService } from './../../services/db.service';

import { Data, DataStudies } from './../../model/data';


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {

  modoEdit: boolean = true;
  dStudies!: DataStudies[];

  constructor(private db: DbService) {

  }

  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        const lData: Data = data as Data;
        this.dStudies = lData.studies;
      }
    )
    
  }

}
