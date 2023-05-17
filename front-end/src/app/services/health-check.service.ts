import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResponseMessage } from '../model/dataTypes';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {


  // Health check path that returns in JSON format
  private url: string = environment.URL + '/check';


  constructor(private httpClient: HttpClient) {

  }


  public check(): Observable<any> {

    const theUrl = `${this.url}`

    return this.httpClient.get<HttpResponse<ResponseMessage>>(theUrl);

  }


}
