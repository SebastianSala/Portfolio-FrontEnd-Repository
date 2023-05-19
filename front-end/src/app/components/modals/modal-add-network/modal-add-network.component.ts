import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { NetworkService } from '../../../services/network.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Network } from '../../../model/network';
import { NetworkData, EntityChange } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-add-network',
  templateUrl: './modal-add-network.component.html',
  styleUrls: ['./modal-add-network.component.scss']
})
export class ModalAddNetworkComponent {


  protected formGroup: FormGroup;

  protected person: Person = new Person();


  public constructor(protected formBuilder: FormBuilder, private networkService: NetworkService, private router: Router, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      netUrl: ['', [Validators.required]],
    })

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {


    const networkConstructor: NetworkData = {
      //setting id to 0 to create a new network instead of updating an existing one
      id: 0,
      name: this.formControl['name'].value,
      netUrl: this.formControl['netUrl'].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }

    const theNetwork = new Network(networkConstructor);

    console.log("*** Creating Network");

    this.networkService.createNetworkByPersonId(theNetwork.getPerson.getId!, theNetwork).subscribe({

      next: (data) => {
        // reseting the form after creation
        this.formGroup.reset();
        // reload entities
        const change: EntityChange = { change: true, entity: theNetwork };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const message = err.error.message;
        console.log(`Error. Create Network addModal: ${message}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error Creating Network: ${message}, status: ${err.status}`);
      },

      complete: () => {
        console.log("+++ Ok. Create Network complete");
        //close modal
        document.getElementById("modalAddNetworkClose")?.click()

        //scroll to the newly created Network
        this.router.navigate(['/index'], { fragment: 'headerId' });
      }

    });

  }


  protected validateForm(event: Event): void {

    event.preventDefault();

    if (this.formGroup.valid) {
      this.onSubmit();
    } else {
      this.formGroup.markAllAsTouched();
      alert("Error. Revisar campos");
    }

  }


  protected clearForm(): void {
    this.formGroup.reset();
  }


}
