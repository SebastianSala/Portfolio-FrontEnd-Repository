import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '../model/dataTypes';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  jsonUrl = './app/model/data.json';
  // jsonUrl = 'http://localhost:4200/app/model/data.json';
  // jsonUrl = './assets/model/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

}

