import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient) {}
  public getWeather(center: Array<number>): Observable<any> {
    return this.httpClient
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${center[0]}&lon=${center[1]}&appid=d570b08169ed4d106ceede5e7ee96426`);
  }
}
