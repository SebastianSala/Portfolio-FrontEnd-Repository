import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent {


  @Input() isLogged: boolean = false;

  // allNetworks: Network[] = [];
  // networkToSend: Network = new Network();
  

}
