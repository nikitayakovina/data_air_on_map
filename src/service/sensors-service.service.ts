import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationService} from "./location-service.service";
import {OptionsMap} from "../app/shared/types";

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
      // return this.httpClient.get('http://narodmon.ru/api/sensorsOnDevice?devices=1,2&uuid=48a0bc5153614888b2bc2a90781f3706&api_key=kSp52HtRnSang&lang=ru')
    });
  }

  public getDiagram(options: OptionsMap): Observable<any> {
    return this.httpClient
      .get(`http://narodmon.ru/api/sensorsHistory?id=${options.id}&period=year&offset=0&uuid=${options.uuid}&api_key=${options.apiKey}
`);
  }
}
