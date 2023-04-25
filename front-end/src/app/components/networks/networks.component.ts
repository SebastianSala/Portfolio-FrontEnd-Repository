import { Component } from '@angular/core';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent {

  protected hover: Array<boolean> = [];
  modoEdit: boolean = true;
  

  protected isHovering(id: number): void {
    // this.hover = !this.hover;
    switch (id) {
      case 1:
        this.hover[id] = !this.hover[id];
        break;

      case 2:
        this.hover[id] = !this.hover[id];
        break;

      case 3:
        this.hover[id] = !this.hover[id];
        break;

      case 4:
        this.hover[id] = !this.hover[id];
        break;

      case 5:
        this.hover[id] = !this.hover[id];
        break;

      default:
        break;
    }
  }



}
