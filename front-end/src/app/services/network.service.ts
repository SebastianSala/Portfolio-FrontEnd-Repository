import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { NetworkData, ResponseMessage } from '../model/dataTypes';
import { Network } from '../model/network';

import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  private url: string = environment.URL + '/network';


  constructor(private httpClient: HttpClient) {

  }


  public getNetworksByPersonEmail(personEmail: String): Observable<Network[]> {

    const theUrl = `${this.url}/person/${personEmail}`;

    return this.httpClient.get<NetworkData[]>(theUrl).pipe(
      map(
        allNetworks => allNetworks.map(
          individualNetwork => new Network(individualNetwork)
        )
      )
    )

  }


  public getNetworksByPersonIdByNetworkId(personId: number, networkId: number): Observable<Network> {

    const theUrl = `${this.url}/person/${personId}/network/${networkId}`;

    return this.httpClient.get<NetworkData>(theUrl).pipe(
      map(
        network => new Network(network)
      )
    )

  }


  public createNetworkByPersonId(personId: number, network: Network): Observable<ResponseMessage> {

    const url = `${this.url}/person/${personId}/network`
    return this.httpClient.post<ResponseMessage>(url, network);

  }


  public updateNetworkByPersonIdByNetworkId(personId: number, networkId: number, network: Network): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/${personId}/network/${networkId}`;
    return this.httpClient.put<ResponseMessage>(theUrl, network);

  }


  public deleteNetworkByPersonIdByNetworkId(personId: number, networkId: number): Observable<ResponseMessage> {

    const theUrl: string = `${this.url}/person/delete?personId=${personId}&networkId=${networkId}`
    return this.httpClient.delete<ResponseMessage>(theUrl)

  }


}