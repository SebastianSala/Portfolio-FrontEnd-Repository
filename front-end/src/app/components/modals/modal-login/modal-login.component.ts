import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

import { Person } from '../../../model/person';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {


  formGroup: FormGroup;

  personLogin?: Person;

  @Output() private logged = new EventEmitter<boolean>;



  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {

    this.formGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    )

  }


  ngOnInit(): void { }


  get Password() {
    return this.formGroup.get('password');
  }

  get Email() {
    return this.formGroup.get('email');
  }


  validateAndSend(event: Event) {

    event.preventDefault();

    if (this.formGroup.valid) {
      //log each from entry
      // for (let [key, value] of Object.entries(this.formGroup.value)) {
      //   sessionStorage.setItem(key, String(value));
      // }
      this.sendLogin();

    } else {
      this.formGroup.get("email")?.markAsTouched();
      this.formGroup.get("password")?.markAsTouched();
      alert("Error. Revisar campos")
    }

  }


  sendLogin() {


    this.authenticationService.login(this.formGroup.value).subscribe({

      next: (response) => {

      },
      error: (err) => {
        console.log("Error in login method: ", err.error.message, err.status);
        alert(err.error.message);
        this.logged.emit(false);
      },
      complete: () => {
        console.log("Login complete, redirecting to index edit");

        this.logged.emit(true);

        //close the modal before redirecting
        document.getElementById("modalLoginClose")?.click();
        this.router.navigate(['/index'], { fragment: 'start' });
      }

    });


  }


}