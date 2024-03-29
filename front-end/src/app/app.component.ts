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

    console.info("*** Starting Backend heath check");

    this.healthCheck.check().subscribe({

      next: (response) => {
        const message = response as unknown as ResponseMessage
        console.log("*** Status Check for Backend application");
        console.warn("*** (only backend app check, without database server)");
        console.log("+++ Ok.", message.message);
      },

      error: (err) => {

        const message = err.error.error ?? "Error. El servidor esta tardando en responder. Intente nuevamente en unos minutos";

        console.error("--- Error. Status Check, error: Backend connection fail: ", message);
        console.error("--- Full error message: ", err);
        alert(message);

      },

      complete: () => {
        console.log("+++ Ok. Status Check, complete: Backend connection success!");
      }

    });


  }

  public increaseFontSize() {
    // document.documentElement.style.setProperty('--font-size-root', '1.25rem');
    document.documentElement.style.setProperty('--bs-root-font-size', '1.25rem');
    console.log("Incresing font  size: ", document.documentElement.style.getPropertyValue('--bs-root-font-size'));
    document.documentElement.style.setProperty('--bs-body-font-size', '1.25rem');
    console.log("Incresing font  size: ", document.documentElement.style.getPropertyValue('--bs-body-font-size'));
    
  }
  public normalFontSize() {
    // document.documentElement.style.setProperty('--font-size-root', '1rem');
    document.documentElement.style.setProperty('--bs-root-font-size', '1rem');
    console.log("Reducing font  size: ", document.documentElement.style.getPropertyValue('--bs-root-font-size'));
    document.documentElement.style.setProperty('--bs-body-font-size', '1rem');
    console.log("Reducing font  size: ", document.documentElement.style.getPropertyValue('--bs-body-font-size'));
  }


}
