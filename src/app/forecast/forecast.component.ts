import {Component, ViewChild} from '@angular/core';
import {SensorsService} from "../../service/sensors-service.service";
import {catchError, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatProgressBar} from "@angular/material/progress-bar";
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _sensors: any;
  public spinner: boolean = false;
  @ViewChild('spinnerElement') spinnerElement: MatProgressBar;
  constructor(private sensorsService: SensorsService, private http: HttpClient) { }
  public get sensors(): any {
    return this._sensors?.devices;
  }

  public getHistorySensors(): void {
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

  public async doForecast(history: any): Promise<void> {
    // const model = await tf.loadLayersModel(history);
  }
}
