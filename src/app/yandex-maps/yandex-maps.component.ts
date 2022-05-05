import { Component, OnInit } from '@angular/core';
import { LocationService } from "../../service/location-service.service";
import randomLocation from 'random-location'

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent implements OnInit {
  private _center: Array<number> = [];
  public zoom: number = 16;
  public get center(): Array<number> {
    return this._center;
  }
  constructor(private locationService: LocationService) { }

  public ngOnInit(): void {
    console.log(this.generateRandomPoint([54.9924, 73.3686], 5))
    this.locationService.getPositions().then(result => {
      this._center.push(result.lat, result.lng);
      /* Готова ли карта? */
      ymaps.ready(() => {
        this.yandexMaps(result.lat, result.lng);
      });
    });
  }

  public getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }

  public generateRandomPoint(center: Array<number>, radius) {
    var x0 = center[1];
    var y0 = center[0];

    var rd = radius/111300;
  
    var u = Math.random();
    var v = Math.random();
  
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
  
    var xp = x/Math.cos(y0);
  
    // return {'lat': y+y0, 'lng': xp + x0};
    return [y+y0, xp + x0];
  }

  public yandexMaps(lat: any, lng: any): void {
    /* Создание карты */
    const myMap = new ymaps.Map('map', 
    {
      center: [lat, lng],
      zoom: 9,
      controls: ['zoomControl']
    },
    {
      minZoom: 5,
      maxZoom: 16,
      // restrictMapArea: [
      //   [54.8689, 73.2959],
      //   [55.0680, 73.1735]
      // ]
    });
    /* Добавление метки */
    const myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [lat, lng]
      }
    });
    const myGeoObject2 = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: this.generateRandomPoint([lat, lng], 1)
      }
    });
    myMap.geoObjects.add(myGeoObject).add(myGeoObject2)
  }
}
