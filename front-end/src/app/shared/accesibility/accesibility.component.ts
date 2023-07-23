import { Component } from '@angular/core';

@Component({
  selector: 'app-accesibility',
  templateUrl: './accesibility.component.html',
  styleUrls: ['./accesibility.component.scss']
})
export class AccesibilityComponent {

  public increaseFontSize() {
    // document.documentElement.style.setProperty('--font-size-root', '1.25rem');
    document.documentElement.style.setProperty('--bs-root-font-size', '1.25rem');
    console.log("Incresing font  size: ", document.documentElement.style.getPropertyValue('--bs-root-font-size'));
    document.documentElement.style.setProperty('--bs-body-font-size', '1.25rem');
    console.log("Incresing font  size: ", document.documentElement.style.getPropertyValue('--bs-body-font-size'));
    
  }
  public normalFontSize() {
    // document.documentElement.style.setProperty('--font-size-root', '1rem');
    document.documentElement.style.setProperty('--bs-root-font-size', '1rem');
    console.log("Reducing font  size: ", document.documentElement.style.getPropertyValue('--bs-root-font-size'));
    document.documentElement.style.setProperty('--bs-body-font-size', '1rem');
    console.log("Reducing font  size: ", document.documentElement.style.getPropertyValue('--bs-body-font-size'));
  }

}
