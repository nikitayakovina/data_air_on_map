import {Component} from '@angular/core';
import {SensorsService} from "../../service/sensors-service.service";
import {catchError, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
          }
        })
    });
  }
}
