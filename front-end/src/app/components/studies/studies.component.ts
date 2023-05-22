import { Component, OnInit } from '@angular/core';

import { DbService } from './../../services/db.service';

import { Data, DataStudies } from '../../model/dataTypes';


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {

  modoEdit: boolean = false;
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
