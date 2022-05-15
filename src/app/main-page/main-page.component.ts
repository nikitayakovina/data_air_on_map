import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocationService } from 'src/service/location-service.service';
import { SensorsService } from 'src/service/sensors-service.service';
import { ColorAir } from '../shared/enums';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  private _airPolution: number;
  public get airPolution(): number {
    return this._airPolution;
  }
  public get timeNow(): string {
    return moment().toDate().toLocaleDateString();
  }
  public colorWell = ColorAir.Well;
  public colorMedium = ColorAir.Medium;
  public colorBad = ColorAir.Bad;
  public colorVeryBad = ColorAir.VeryBad;
  public colorVeryVeryBad = ColorAir.VeryVeryBad;
  constructor(private locationService: LocationService, private sensorsService: SensorsService) {}

  ngOnInit(): void {
    this.locationService.getPositions().then(result => {
      this.getAirPolution(result.lat, result.lng);
      ymaps.ready(() => {
        this.yandexMaps(result.lat, result.lng);
      });
    });
  }
  public yandexMaps(lat: any, lng: any): void {
    const myMap = new ymaps.Map('map',
    {
      center: [lat, lng],
      zoom: 12,
      controls: ['zoomControl']
    },
    {
      minZoom: 5,
      maxZoom: 22
    });

    const myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [lat, lng]
      }
    });
    myMap.geoObjects.add(myGeoObject);
  }
  public getAirPolution(lat: any, lng: any): void {
    this.sensorsService.getSensordAir([lat, lng])
          .subscribe(sensor => {
            Object.keys(sensor).forEach(_sensor => {
              if (_sensor === 'list') {
                Object.keys(sensor[_sensor]).forEach(__sensor => {
                  this._airPolution = sensor[_sensor][__sensor].main.aqi;
                });
              }
            });
          });
  }
}
