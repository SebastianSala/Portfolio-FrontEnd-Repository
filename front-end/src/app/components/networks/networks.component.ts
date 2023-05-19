import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NetworkService } from '../../services/network.service';
import { ChangeEntityService } from '../../services/change-entity.service';

import { Network } from '../../model/network';
import { Subscription } from 'rxjs';
import { EntityChange } from '../../model/dataTypes';


@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit, OnDestroy {


  @Input() isLogged: boolean = false;

  protected allNetworks: Network[] = [];
  protected networkToSend: Network = new Network();

  private networkSubscription?: Subscription;


  constructor(private networkService: NetworkService, private authenticationService: AuthenticationService, private changeEntityService: ChangeEntityService) {
    this.updateNetworks();

  }


  ngOnInit(): void {
    this.getAllNetworks();
  }

  ngOnDestroy(): void {
    this.networkSubscription?.unsubscribe();
  }


  private updateNetworks(): void {

    this.networkSubscription = this.changeEntityService.entityChanged.subscribe({

      next: (res: EntityChange) => {
        if (res.entity instanceof Network) {
          console.log("updateNetworks, is Network type: ", res.entity);
          //reset the entity to send after using it
          this.networkToSend = new Network();
          //reload the entities from the data base to show
          this.getAllNetworks();
        } else {
          console.log("updateNetwork, not of type Network: ", res.entity);

        }
      },

      error: (err: any) => {
        console.log("Error. UpdateNetwork: ", err);
      }

    });

  }


  private getAllNetworks(): void {


    console.log("*** Loading Networks");

    const personEmail = this.authenticationService.authenticatedUser.email;

    this.networkService.getNetworksByPersonEmail(personEmail).subscribe({

      next: (res) => {
        this.allNetworks = res;
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.log("--- Error. Load networks: ", err);
        alert(errorMessage);
      },

      complete: () => {
        console.log("+++ Ok. Load Networks complete");

      }

    });

  }


  protected sendNetwork(network: Network): void {
    this.networkToSend = network;
  }


}
