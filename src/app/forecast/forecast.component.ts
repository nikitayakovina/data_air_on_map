import {Component, ViewChild} from '@angular/core';
import {SensorsService} from "../../service/sensors-service.service";
import {catchError, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatProgressBar} from "@angular/material/progress-bar";
// import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _uuid = '48a0bc5153614888b2bc2a90781f3706';
  private _apiKey = 'kSp52HtRnSang';
  private _sensors: any;
  private _historySensors: any;
  public spinner: boolean = false;
  @ViewChild('spinnerElement') spinnerElement: MatProgressBar;
  constructor(private sensorsService: SensorsService, private http: HttpClient) { }
  public get sensors(): any {
    return this._sensors?.devices;
  }

  public getSensors(): void {
    this.spinner = true;
    this.sensorsService.getSensorsHistory().then(result => {
      result
        .pipe(catchError(e => {
          alert(e);
          return of(e);
        }))
        .subscribe((res) => {
          if (res) {
            this.spinner = false;
          }
          this._sensors = res;
          console.log(res)
        })
    });
  }
/* history sensors by idSensors */
  public getDiagram(id: number): void {
    this.sensorsService
      .getDiagram({ id: id, uuid: this._uuid, apiKey: this._apiKey })
      .pipe(catchError(e => {
        alert(e);
        return of(e);
      }))
      .subscribe(res => {
        console.log(res)
        // this.doForecast(res);
      });
  }

  public async doForecast(history: any): Promise<void> {
    // const model = await tf.loadLayersModel(history);
  }
}
