import {Component} from '@angular/core';
import {SensorsService} from "../../service/sensors-service.service";
import {catchError, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as tf from '@tensorflow/tfjs';
import {DataForecast} from "../shared/types";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  private _dataForForecast: Array<DataForecast> = [];
  public spinner: boolean = false;
  constructor(private sensorsService: SensorsService) { }

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
            this.getSMA(this.dataConversion(res));
          }
        })
    });
  }
  /* Преобразование полученных данных с API */
  public dataConversion(historyData: object): Array<DataForecast> {
    Object.keys(historyData).forEach(arr => {
      if (arr === 'list'){
        Object.keys(historyData[arr]).forEach(_arr => {
          this._dataForForecast.push({ date: historyData[arr][_arr].dt, index: historyData[arr][_arr].main.aqi });
        })
      }
    });
    return this._dataForForecast;
  }
  /* Простая скользящая средняя (SMA) */
  public getSMA(data: Array<DataForecast>): number {
    let SMA: number = 0;
    Object.keys(data).forEach(res => {
      return SMA += data[res].index / data.length;
    });
    return SMA;
  }

  public trainModel(): void {
    const model = tf.sequential();
  }
}
