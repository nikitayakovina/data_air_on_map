import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationService} from "./location-service.service";

@Injectable()
export class SensorsService {
  constructor(private httpClient: HttpClient) {}

  public getSensordAir(center): Observable<any> {
      return this.httpClient
        .get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${center[0]}&lon=${center[1]}&appid=d570b08169ed4d106ceede5e7ee96426`);
  }
}
