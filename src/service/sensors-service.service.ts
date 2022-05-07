import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationService} from "./location-service.service";
import {OptionsMap} from "../app/shared/types";
import * as moment from "moment";

@Injectable()
export class SensorsService {
  constructor(private httpClient: HttpClient, private locationService: LocationService) {}

  /* get sensors history */
  public getSensorsHistory(): Promise<Observable<any>> {
    return this.locationService.getPositions().then(result => {
      return this.httpClient
        .get(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${result.lat}&lon=${result.lng}&start=${moment().startOf('years').unix()}&end=${moment().unix()}&appid=a50cfb70fe89823fb332df31e05285ea`)
    });
  }

  /* forecast for 5 days */
  public getSensorsForecast(): Promise<Observable<any>> {
    return this.locationService.getPositions().then(result => {
      return this.httpClient
      .get(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${result.lat}&lon=${result.lng}&appid=a50cfb70fe89823fb332df31e05285ea`);
    });
  }

  public getSensordAir(center): Observable<any> {
      return this.httpClient
        .get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${center[0]}&lon=${center[1]}&appid=d570b08169ed4d106ceede5e7ee96426`);
  }
}
