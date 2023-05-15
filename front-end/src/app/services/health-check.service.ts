import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResponseMessage } from '../model/dataTypes';

import { ENVIROMENT } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {


  // Health check path that returns in JSON format
  private url: string = ENVIROMENT.url + '/check';


  constructor(private httpClient: HttpClient) {

  }


  public check(): Observable<any> {

    const theUrl = `${this.url}`

    return this.httpClient.get<HttpResponse<ResponseMessage>>(theUrl);

  }


}
