import { Injectable } from '@angular/core';
//import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

import 'firebase/compat/storage';

import { environment } from '../../environments/environment';
import { PersonData } from '../model/dataTypes';
// import 'firebase/compat/auth';
//import 'firebase/compat/firestore';


//initializeApp(enviroment.firebaseConfig);
firebase.initializeApp(environment.firebaseConfig);


@Injectable({
  providedIn: 'root'
})
export class ImgStorageService {


  storageRef = firebase.app().storage().ref();


  constructor() {

  }


  async subirImagen(nombre: string, imgBase64: any) {

    const currentUser: PersonData = JSON.parse(sessionStorage.getItem('currentUser') || "{}");
    const folder = currentUser!.email;

    try {
      let respuesta = await this.storageRef.child("users/" + folder + "/" + nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);

      console.log(respuesta.ref.getDownloadURL());


      return await respuesta.ref.getDownloadURL();
      // return null;

    } catch (err) {
      console.log(err);
      return null;

    }





  }


}
