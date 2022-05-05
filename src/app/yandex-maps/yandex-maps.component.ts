import { Component, OnInit } from '@angular/core';
import { LocationService } from "../../service/location-service.service";
import {MarkersService} from "../../service/markers-service.service";
import {SensorsService} from "../../service/sensors-service.service";

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent implements OnInit {
  private _center: Array<number> = [];
  // public zoom: number = 16;
  public get center(): Array<number> {
    return this._center;
  }
  constructor(
    private locationService: LocationService,
    private markersService: MarkersService,
    private sensorsService: SensorsService) {}

  public ngOnInit(): void {
    this.locationService.getPositions().then(result => {
      this._center.push(result.lat, result.lng)
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
      maxZoom: 16
    });
    // const myGeoObject = new ymaps.GeoObject({
    //   geometry: {
    //     type: "Point",
    //     coordinates: [lat, lng]
    //   }
    // });
    // myMap.geoObjects.add(myGeoObject);

    let markers = [
      [55.032005688796886,73.49408631658085],
      [55.036722384724555,73.42678133767092],
      [55.01601342901014,73.43656603615727],
      [55.027256767102514,73.37991778176276],
      [55.04027141234805,73.3268744162842],
      [55.05479338409094,73.28249448335919],
      [55.04130517127677,73.23625346705798],
      [55.05185213515002,73.19308220514624],
      [55.0296855226365,73.2519306061508],
      [55.025216854741515,73.32286259242446],
      [55.01880623994609,73.368524518694],
      [54.9962129455754,73.36697956630142],
      [54.98041570321412,73.30681856092909],
      [54.992359958903386,73.24467714247207],
      [54.97324366524279,73.38676891209658],
      [54.98788512729619,73.4521308072725],
      [54.97514961684365,73.4747901090303],
      [54.946370672058684,73.43576407679213]
    ]
    for (let i = 0; i < markers.length; i++) {
      this.sensorsService.getSensordAir(markers[i])
        .subscribe(res => {
          Object.keys(res).forEach(arr => {
            if (arr === 'list'){
              Object.keys(res[arr]).forEach(_arr => {
                myMap.geoObjects.add(new ymaps.GeoObject({
                  geometry: {
                    type: "Point",
                    coordinates: markers[i]
                  },
                  properties: {
                    iconContent: res[arr][_arr].main.aqi
                  }
                }));
              })
            }
          });
        })
    }

    // for (let i=0; i < 2000; i++){
    //   myMap.geoObjects.add(new ymaps.GeoObject({
    //     geometry: {
    //       type: "Point",
    //       coordinates: this.markersService.radiusByCenter([lat, lng])
    //     }
    //   }))
    // }
  }
}
