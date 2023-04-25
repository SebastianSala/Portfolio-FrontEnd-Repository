import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {


  form: FormGroup;


  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    )

  }


  ngOnInit(): void { }


  get Password() {
    return this.form.get('password');
  }

  get Email() {
    return this.form.get('email');
  }

  get PasswordInvalid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  get EmailInvalid() {
    // return this.Email?.touched && !this.Email?.valid;
    return this.Email?.touched && this.Email?.errors;
    // return this.Email?.touched && this.Email?.hasError("email");
  }


  onSend(event: Event) {

    event.preventDefault();

    if (this.form.valid) {
      console.log(this.form.value);
      
      alert("Todo ok, enviar formulario")
      //sessionStorage.setItem('currentUser', 'someValue')
      // for (let key in this.form.value) {
        // //   sessionStorage.setItem(key, this.form.value[key]);
      // }
      for (let [key, value] of Object.entries(this.form.value)) {
          sessionStorage.setItem(key, String(value));
        }
        
        let data = this.form.value;
        sessionStorage.setItem('currentUser', JSON.stringify(this.form.value));//JSON.stringify(data));
    }
    else {
      console.log(this.form.value);
      // this.form.markAllAsTouched();
      this.form.get("email")?.markAsTouched();
      this.form.get("password")?.markAsTouched();
      alert("Mail o contraseña incorrectos")
      sessionStorage.clear();
    }

  }


}