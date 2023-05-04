import { Component } from '@angular/core';
import { DbService } from '../../services/db.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {


  constructor(private db: DbService, private router: Router) { }


  ngOnInit() {


    this.router.navigate(['/index'], {fragment: 'headerId'});

    this.db.getData().subscribe(
      data => {
        console.log(data);
      }
    );
  }


}
