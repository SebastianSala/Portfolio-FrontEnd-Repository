import { Component, OnInit } from '@angular/core';

import { HealthCheckService } from './services/health-check.service';
import { ResponseMessage } from './model/dataTypes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private healthCheck: HealthCheckService) {
  }


  ngOnInit(): void {

    // Checking if the backend server is running the application
    // regardles of the database server state, only quering a message that does not connect to the database
    this.doChecks();

  }


  private doChecks() {


    this.healthCheck.check().subscribe({

      next: (response) => {
        const message = response as unknown as ResponseMessage
        console.log("-------- Status Check for Backend application");
        console.log("-------- (only backend app, without database server)");
        console.log("-------- 1.", message.message);
      },

      error: (err) => {

        console.log("-------- Status Check, error: Backend connection fail: ", err.error.error);
        console.log("-------- Full error message: ", err);

      },

      complete: () => {
        console.log("-------- Status Check, complete: Backend connection success!");
      }

    });


  }


}
