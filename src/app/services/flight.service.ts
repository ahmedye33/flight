import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  readonly flightUrl = 'http://nmflightapi.azurewebsites.net/api/flight';

  constructor(private httpClient: HttpClient) { }

  getFlight() {
    return this.httpClient.get(this.flightUrl);
  }

}
