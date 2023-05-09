import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Person } from '../../../model/person';
import { PersonData } from '../../../model/data';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {


  formGroup: FormGroup;

  // userData?: { id?: number, email?: string } = { id: 0, email: "" };
  personLogin?: Person;

  @Output() private logged = new EventEmitter<boolean>;



  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router, private personService: PersonService) {

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
      
      for (let [key, value] of Object.entries(this.formGroup.value)) {
        sessionStorage.setItem(key, String(value));
      }

      this.sendLogin();

    }
    else {
      console.log("Log from validate error", this.formGroup.value);
      // this.formGroup.markAllAsTouched();
      this.formGroup.get("email")?.markAsTouched();
      this.formGroup.get("password")?.markAsTouched();
      alert("Mail o contraseña incorrectos")
      sessionStorage.clear();
    }

  }


  sendLogin() {
    
    this.authenticationService.login(this.formGroup.value).subscribe({
      next: (response) => {

        const res = response as Person;

        let personData = {
          id: res.getId,
          email: res.getEmail,
          name: res.getName
        } as PersonData;

        // this.personLogin = new Person(JSON.parse(JSON.stringify(response.body)))// as PersonData)
        // this.personService.getPersonByEmail(response.body?.getEmail || "").subscribe();

      },
      error: (err) => {
        console.log("Error in login method: ", err.error.message, err.status);
        alert(err.error.message);
        // this.router.navigate(['/index']);
        this.logged.emit(false);
      },
      complete: () => {
        console.log("Login method complete, redirecting to index edit");
        //navigate to index-edit
        // this.router.navigate(['/index-edit']);

        this.logged.emit(true);

        document.getElementById("modalLoginClose")?.click();
        this.router.navigate(['/index'], { fragment: 'start' });
      }
    });

  }


}