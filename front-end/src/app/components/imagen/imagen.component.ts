import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/imgStorage.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss']
})
export class ImagenComponent {


  constructor(private storageService: StorageService) {
  }



  imagenes: any[] = [];

  cargarImagen(event: any) {
    let archivos = event.target.files;
    let nombre: string = "sebastian";

    for (let i = 0; i < archivos.length; i++) {

      let reader = new FileReader();

      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        this.imagenes.push(reader.result);

        this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
          let usuario = {
            name: "sebastian",
            nickName: "seba",
            password: "401325",
            imgProfile: urlImagen
          }
          console.log(usuario);
        })
      }

    }


  }

}
