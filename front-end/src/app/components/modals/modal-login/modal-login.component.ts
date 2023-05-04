import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {


  formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {

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

  // get PasswordInvalid() {
  //   // return this.Password?.touched && !this.Password?.valid;
  //   if (this.Password?.touched) {
  //     if (this.Password.errors) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return;

  // }

  // get EmailInvalid() {
  //   // return this.Email?.touched && !this.Email?.valid;
  //   return this.Email?.touched && this.Email?.errors;
  //   // return this.Email?.touched && this.Email?.hasError("email");
  // }


  validateAndSend(event: Event) {

    event.preventDefault();

    if (this.formGroup.valid) {
      console.log("log from validateAndSend: ", this.formGroup.value);

      this.sendLogin();

      // alert("Todo ok, enviar formulario")
      //sessionStorage.setItem('currentUser', 'someValue')
      // for (let key in this.form.value) {
      // //   sessionStorage.setItem(key, this.form.value[key]);
      // }
      for (let [key, value] of Object.entries(this.formGroup.value)) {
        sessionStorage.setItem(key, String(value));
      }

      let data = this.formGroup.value;
      sessionStorage.setItem('currentUser', JSON.stringify(this.formGroup.value));//JSON.stringify(data));
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

    console.log("log from SendLogin");

    this.loginService.login(this.formGroup.value).subscribe({
      next: (response) => {
        console.log("the Response from the backend login: ", response);
        console.log("expected: personId and name: ", response);
        // this.router.navigate(['/index']);
      },
      error: (err) => {
        console.log("Error in login method: ", err);
        // this.router.navigate(['/index']);        
      },
      complete: () => {
        console.log("Login method complete, redirecting to index edit");
        this.router.navigate(['/index']);
      }
    })

  }


}