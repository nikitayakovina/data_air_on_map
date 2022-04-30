import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationService} from "./location-service.service";
import {OptionsMap} from "../app/shared/types";
import * as moment from "moment";

@Injectable()
export class SensorsService {
  constructor(private httpClient: HttpClient, private locationService: LocationService) {}

  public getSensors(): Promise<Observable<any>> {
    return this.locationService.getPositions().then(result => {
      return this.httpClient
        .get(`https://narodmon.ru/api/sensorsNearby?lat=${result.lat}
        &lon=${result.lng}
        &radius=200
        &types=1&uuid=48a0bc5153614888b2bc2a90781f3706&api_key=kSp52HtRnSang&lang=ru`);
    });
  }

  // public getSensors1(): Promise<Observable<any>> {
  //   return this.locationService.getPositions().then(result => {
  //     return this.httpClient
  //       .get(`https://data.sensor.community/airrohr/v1/filter/area=${result.lat},${result.lng},200&type=DNMS  (Laerm)`);
  //   });
  // }

  /* get sensors history */
  /* start */
  /* end */
  public getSensorsHistory(): Promise<Observable<any>> {
    return this.locationService.getPositions().then(result => {
      return this.httpClient
        .get(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${result.lat}&lon=${result.lng}&start=${moment().startOf('years').unix()}&end=${moment().unix()}&appid=a50cfb70fe89823fb332df31e05285ea`)
    });
  }
/* forecast for 5 days */
  public getSensorsForecast(): Promise<Observable<any>> {
    console.log(moment().format())
    return this.locationService.getPositions().then(result => {
      return this.httpClient
      .get(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${result.lat}&lon=${result.lng}&appid=a50cfb70fe89823fb332df31e05285ea`);
    });
  }

  public getDiagram(options: OptionsMap): Observable<any> {
    return this.httpClient
      .get(`http://narodmon.ru/api/sensorsHistory?id=${options.id}&period=year&offset=0&uuid=${options.uuid}&api_key=${options.apiKey}`);
  }
}
