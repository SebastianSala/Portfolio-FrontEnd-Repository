import { Component, Input, OnInit } from '@angular/core';

import { DbService } from 'src/app/services/db.service';

import { Data } from 'src/app/model/data';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  // modoEdit: boolean = true;
  @Input() isLogged: boolean = false;
  
  data?: Data;


  constructor(private db: DbService) {

  }


  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        const lData: Data = data as Data;
        this.data = lData;
      },
      error => console.error("Error on Banner", error)      
      );

      console.log("log from banner, ngOnInit: ", this.isLogged);
      
      
  }


}
