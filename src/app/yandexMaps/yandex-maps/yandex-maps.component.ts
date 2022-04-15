import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Coordinates} from "../types";

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent {
  @ViewChild('yamaps')
  public el!: ElementRef;
  private _center: Coordinates;
  private _zoom: number;
  public map: any;
  @Input() set zoom(value: number) {
    this._zoom = value;
  }
  public get zoom(): number {
    return this._zoom;
  }
  @Input() set center(value: Coordinates) {
    if (value) {
      this._center = value;
      this.createMap();
    }
  }
  public get center(): Coordinates {
    return this._center;
  }
  constructor() {}

  public createMap(): void {
    this.map = new ymaps.Map('map', {
      center: [this._center.lat, this._center.lng],
      zoom: this.zoom
    })
    const placeMark = new ymaps.Placemark([this._center.lat, this._center.lng]);
    this.map.geoObjects.add(placeMark);
  }

  // public getSensors(): void {
  //   this.httpClient
  //     .get(`https://narodmon.ru/api/sensorsNearby?lat=${this.centerYandex[0]}&
  //     lon=${this.centerYandex[1]}&radius=200&types=1,2&uuid=48a0bc5153614888b2bc2a90781f3706&api_key=kSp52HtRnSang&lang=ru`)
  //     .subscribe(val => {
  //       console.log(val)
  //     });
  // }
}
