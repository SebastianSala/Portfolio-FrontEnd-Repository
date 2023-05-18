import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NetworkService } from '../../services/network.service';

import { Network } from '../../model/network';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {


  @Input() isLogged: boolean = false;

  protected allNetworks: Network[] = [];
  protected networkToSend: Network = new Network();

  private networkSubscription?: Subscription;


  constructor(private networkService: NetworkService, private authenticationService: AuthenticationService) {

  }


  ngOnInit(): void {
    this.loadNetworks();
    // this.isLogged = false
  }


  private loadNetworks(): void {

    console.log("---loading networks------");

    const personEmail = this.authenticationService.authenticatedUser.email;

    this.networkService.getNetworksByPersonEmail(personEmail).subscribe({

      next: (res) => {
        console.log("Ok. Load networks, 1: ", res);
        this.allNetworks = res;
      },

      error: (err) => {
        const errorMessage = err.error.message ?? err.error ?? err;
        console.log("Error. Load networks, 1: ", err);
        alert(errorMessage);
      },

      complete: () => {
        console.log("Ok. Load networks complete");

      }

    });

  }


  protected sendNetwork(network: Network): void {
    this.networkToSend = network;
  }


}
