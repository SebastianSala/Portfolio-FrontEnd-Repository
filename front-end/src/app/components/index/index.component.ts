import { Component } from '@angular/core';
import { DbService } from '../../services/db.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(private db: DbService) { }

  ngOnInit() {

    this.db.getData().subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
