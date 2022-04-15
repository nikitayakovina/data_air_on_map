import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { LocationService } from 'src/service/location-service.service';
import {Coordinates} from "./yandexMaps/types";
declare const ymaps: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private _centerYandex: number[] = [];
  private _zoom: number = 12;
  // el!: ElementRef;
  // map: any;
  // @ts-ignore
  // @ViewChild('yamaps')
  private _center: Coordinates;
  public get center(): Coordinates {
    return this._center;
  }
  public get zoom(): number {
    return this._zoom;
  }
  constructor(
    private locationService: LocationService,
    private httpClient: HttpClient
    ) {
  }

  ngOnInit(): void {
    this.getLocation();
    // ymaps.ready().done(() => this.createMap());
  }
  // public get centerYandex(): number[] {
  //   return this._centerYandex;
  // }
  // public get zoom(): number {
  //   return this._zoom;
  // }
  // public createMap(): void {
  //   this.map = new ymaps.Map('map', {
  //     center: this.centerYandex,
  //     zoom: this.zoom
  //   })
  //   const placeMark = new ymaps.Placemark([this.centerYandex[0], this.centerYandex[1]]);
  //   this.map.geoObjects.add(placeMark);
  // }
  public getLocation(): void {
    this.locationService.getPosition().then(pos => {
      this._center.lat = pos.lat;
      this._center.lng = pos.lng;
    });
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
