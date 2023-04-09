import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

import { Data, DataContacMe } from '../../model/data';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {

  dContactMe?: DataContacMe;   

  constructor(private db: DbService) {

  }

  ngOnInit(): void {
    this.db.getData().subscribe(
      data => {
        // usando aliases para tener la información de tipos y autocompletado de typescript y hacer más robusta la app
        const datos = data as Data;
        this.dContactMe = datos.ContactMe
      }
    )
  }

}
