import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent {
  @ViewChild('yamaps')
  public el!: ElementRef;
  private _center: number[];
  private _zoom: number;
  public map: any;
  @Input() set zoom(value: number) {
    this._zoom = value;
  }
  public get zoom(): number {
    return this._zoom;
  }
  @Input() set center(value: number[]) {
    if (value) {
      this._center = value;
    }
  }
  public get center(): number[] {
    return this._center;
  }
  constructor() {}

  // public getSensors(): void {
  //   this.httpClient
  //     .get(`https://narodmon.ru/api/sensorsNearby?lat=${this.centerYandex[0]}&
  //     lon=${this.centerYandex[1]}&radius=200&types=1,2&uuid=48a0bc5153614888b2bc2a90781f3706&api_key=kSp52HtRnSang&lang=ru`)
  //     .subscribe(val => {
  //       console.log(val)
  //     });
  // }
}
