import { Component } from '@angular/core';
import {SensorsService} from "../../service/sensors-service.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _uuid = '48a0bc5153614888b2bc2a90781f3706';
  private _apiKey = 'kSp52HtRnSang';
  private _sensors: any;
  constructor(private sensorsService: SensorsService) { }
  public get sensors(): any {
    return this._sensors;
  }

  public getSensors(): void {
    this.sensorsService.getSensors().then(result => {
      result
        .pipe(catchError(e => {
          alert(e);
          return of(e);
        }))
        .subscribe((res) => {
          this._sensors = res;
          console.log(res);
        })
    });
  }

  public getDiagram(): void {
    this.sensorsService.getDiagram({ id: 1, uuid: this._uuid, apiKey: this._apiKey });
  }
}
