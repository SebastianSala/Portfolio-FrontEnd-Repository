import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  modoEdit: boolean = true;
  data: any;


  constructor(private db: DbService) {

  }


  ngOnInit(): void {

    this.db.getData().subscribe(
      data => this.data = data,
      error => console.error("Error on Banner", error)      
      );
      
  }


}
