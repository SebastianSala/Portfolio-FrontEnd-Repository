import { Injectable } from '@angular/core';
//import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

import 'firebase/compat/storage';

import { environment } from 'src/environments/environment';
// import 'firebase/compat/auth';
//import 'firebase/compat/firestore';


//initializeApp(enviroment.firebaseConfig);
firebase.initializeApp(environment.firebaseConfig);


@Injectable({
  providedIn: 'root'
})
export class StorageService {


  // storageRef = firebase.app().storage().ref();
  storageRef = firebase.app().storage().ref();

  
  constructor() { }


  async subirImagen(nombre: string, imgBase64: any) {

    try {
      let respuesta = await this.storageRef.child("users/"+nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);

      console.log(respuesta.ref.getDownloadURL());
      
      
      return await respuesta.ref.getDownloadURL();
      // return null;
      
    }catch(err) {
      console.log(err);
      return null;
      
    }





  }


}
