import { Component, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { NetworkService } from '../../../services/network.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Person } from '../../../model/person';
import { Network } from '../../../model/network';
import { NetworkData, EntityChange } from '../../../model/dataTypes';


@Component({
  selector: 'app-modal-edit-network',
  templateUrl: './modal-edit-network.component.html',
  styleUrls: ['./modal-edit-network.component.scss']
})
export class ModalEditNetworkComponent implements OnChanges {


  @Input() networkToEdit!: Network;
  protected person: Person = new Person();

  protected formGroup: FormGroup;




  public constructor(protected formBuilder: FormBuilder, private networkService: NetworkService, private router: Router, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {

    //creation of form's form controls group
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      netUrl: ['', [Validators.required]],
    })

  }


  ngOnChanges(): void {

    this.formGroup = this.formBuilder.group({
      name: [this.networkToEdit.getName, [Validators.required]],
      netUrl: [this.networkToEdit.getNetUrl, [Validators.required]]
    });

  }


  protected get formControl(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }


  protected onSubmit() {


    const networkConstructor: NetworkData = {
      // setting id to networkToEdit.getId to update an existing network instead of creating a new one
      id: this.networkToEdit.getId!,
      name: this.formControl['name'].value,
      netUrl: this.formControl['netUrl'].value,
      // assigning the current logged in person, to enforce relationships between entities.
      person: this.authenticationService.authenticatedUser
    }

    const theNetwork = new Network(networkConstructor);
    
    console.info("*** Editing Network");

    this.networkService.updateNetworkByPersonIdByNetworkId(theNetwork.getPerson.getId!, theNetwork.getId!, theNetwork).subscribe({

      next: (data) => {
        // reload entities
        const change: EntityChange = { change: true, entity: theNetwork };
        this.changeEntityService.changeEntity(change);
        alert(data.message)
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.error(`--- Error. Edit Network editModal: ${errorMessage}, status: ${err.status}`);
        // the user should never see this error
        alert(`Error al editar Red: ${errorMessage}, status: ${err.status}`);
      },
      
      complete: () => {
        //close modal
        console.log("+++ Ok. Edit Network complete");

        document.getElementById("modalEditNetworkClose")?.click()

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
