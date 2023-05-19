import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NetworkService } from '../../../services/network.service';
import { ChangeEntityService } from '../../../services/change-entity.service';

import { Network } from '../../../model/network';

@Component({
  selector: 'app-modal-delete-network',
  templateUrl: './modal-delete-network.component.html',
  styleUrls: ['./modal-delete-network.component.scss']
})
export class ModalDeleteNetworkComponent {


  @Input() networkToDelete!: Network;


  constructor(private networkService: NetworkService, private router: Router, private changeEntityService: ChangeEntityService) {

  }


  deleteNetwork(): void {

    console.log("*** Deleting Network");

    this.networkService.deleteNetworkByPersonIdByNetworkId(this.networkToDelete.getPerson.getId as number, this.networkToDelete.getId as number).subscribe({

      next: (res) => {
        console.log(res.message);
      },

      error: (err) => {
        const message = err.error.message;
        console.log("--- Error. Delete network method in deleteModal: ", message);
        alert(message);
      },

      complete: () => {
        // reload entities
        this.changeEntityService.changeEntity({change: true, entity: this.networkToDelete});
        console.log("+++ Ok. Delete network complete!");
        
        this.router.navigate(['/index'], { fragment: 'headerId' });
      }
    });

  }


}
