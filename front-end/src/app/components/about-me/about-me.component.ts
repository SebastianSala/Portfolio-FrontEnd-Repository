import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  data: any;
  dataAbout: any;
  modoEdit: boolean = true;
  

  constructor(private db: DbService) {
  }

  ngOnInit(): void {

    this.db.getData().subscribe(
      data => {
        this.data = data;
        this.dataAbout = data.about;
      }
    );

  }

}
