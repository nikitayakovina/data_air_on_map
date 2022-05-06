import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../service/location-service.service";
import {MarkersService} from "../../service/markers-service.service";
import {SensorsService} from "../../service/sensors-service.service";
import {ColorAir} from "../shared/enums";
import * as moment from "moment";
import {RequestsService} from "../../service/requests-service.service";
import bbox from '@turf/bbox';
import * as turf from '@turf/turf';
import { RequestsService } from 'src/service/requests-service.service';

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent implements OnInit {
  private _center: Array<number> = [];
  public get center(): Array<number> {
    return this._center;
  }
  constructor(
    private locationService: LocationService,
    private markersService: MarkersService,
    private sensorsService: SensorsService,
    private requestsService: RequestsService) {}

  public ngOnInit(): void {
    // let area = {
    //   "type": "Feature",
    //   "geometry": {
    //     "type": "Polygon",
    //     "coordinates": [[
    //       [55.032005688796886,73.49408631658085],
    //       [55.036722384724555,73.42678133767092],
    //       [55.01601342901014,73.43656603615727],
    //       [55.043548, 73.327829],
    //       [55.05479338409094,73.28249448335919],
    //       [55.052657, 73.237474],
    //       [55.05185213515002,73.19308220514624],
    //       [55.0296855226365,73.2519306061508],
    //       [55.025216854741515,73.32286259242446],
    //       [55.01880623994609,73.368524518694],
    //       [54.9962129455754,73.36697956630142],
    //       [54.98041570321412,73.30681856092909],
    //       [54.992359958903386,73.24467714247207],
    //       [54.97324366524279,73.38676891209658],
    //       [54.98788512729619,73.4521308072725],
    //       [54.97514961684365,73.4747901090303],
    //       [54.946370672058684,73.43576407679213]
    //     ]]
    //   }
    // }
    this.locationService.getPositions().then(result => {
      this._center.push(result.lat, result.lng)
      ymaps.ready(() => {
      //   ymaps.ready(function() {
      //     let map = new ymaps.Map("map", {
      //       center: [result.lat, result.lng],
      //       zoom: 9,
      //       controls: []
      //     });
      //     map.geoObjects.add(new ymaps.GeoObject(area))
      //     var bbox = turf.bbox(area);
      //     let count = 15
      //     for (var x=0; x< count; x++){
      //       for (var y=0; y< count; y++){
      //         let obj = {
      //           geometry: {
      //             type:'Point',
      //             coordinates:[
      //               bbox[0] + (bbox[2]-bbox[0])/count*x,
      //               bbox[1] + (bbox[3]-bbox[1])/count*y
      //             ]
      //           },
      //           properties: {
      //             fillColor: '#ffff0022'
      //           }
      //         };
      //         // if (turf.booleanPointInPolygon(obj.geometry.coordinates, area))
      //           map.geoObjects.add(new ymaps.GeoObject(obj))
      //       }
      //     }
      //   });
        this.yandexMaps(result.lat, result.lng);
      });
    });
  }

  public getForecast(): void {
    this.requestsService.getForecasts().subscribe(res => {
      return res;
    })
  }
  
  
  // Usage Example.
  // Generates 100 points that is in a 1km radius from the given lat and lng point.

  public yandexMaps(lat: any, lng: any): void {
    const a = this.markersService.generateRandomPoints({'lat':lat, 'lng':lng}, 1000, 100);
    const myMap = new ymaps.Map('map',
    {
      center: [lat, lng],
      zoom: 18,
      controls: ['zoomControl']
    },
    {
      minZoom: 5,
      maxZoom: 22,
      // restrictMapArea: [
      //   [55.141278, 73.057086],
      //   [54.818015, 73.646356]
      // ]
    });


    var myPolygon1 = new ymaps.Polygon([
      [
        [55.043797, 73.489265],
        [55.025099, 73.504028],
        [55.020866, 73.462143],
        [55.031792, 73.419571],
        [55.053438, 73.423519]
      ],
      [
        [55.027442, 73.350134],
        [55.018582, 73.3146],
        [55.006865, 73.34301],
        [55.009671, 73.353739]
      ],
      [
        [55.036009, 73.377943],
        [55.026069, 73.352108],
        [55.008544, 73.355284],
        [55.009135, 73.374081]
      ]
    ], {

    }, {
      fillColor: 'rgba(216,250,219,0.34)',
      strokeWidth: 1,
      opacity: 0.8
      maxZoom: 16,
      // restrictMapArea: [
      //   [55.141278, 73.057086],
      //   [54.868814, 73.621817]
      // ]
    });

    myMap.geoObjects.add(myPolygon1)

    /* границы Омска */
    var myPolygon = new ymaps.Polygon([
      [
        [55.116930, 73.255865],
        [55.100417, 73.173918],
        [55.136214, 73.187147],
        [55.141762, 73.153131],
        [54.945587, 73.145994],
        [54.937180, 73.245004],
        [54.822915, 73.300415],
        [54.864133, 73.491511],
        [54.888610, 73.515136],
        [54.939507, 73.523784],
        [54.949600, 73.615530],
        [55.010378, 73.599217],
        [55.072512, 73.531065]
      ]
    ], {

    }, {
      fillColor: 'rgba(216,250,219,0.34)',
      strokeWidth: 1,
      opacity: 0.8
    });
    // myMap.geoObjects.add(myPolygon);
    const myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [lat, lng]
      }
    });
    myMap.geoObjects.add(myGeoObject);

    let markers = [
      [55.032005688796886,73.49408631658085],
      [55.036722384724555,73.42678133767092],
      [55.01601342901014,73.43656603615727],
      [55.043548, 73.327829],
      [55.05479338409094,73.28249448335919],
      [55.052657, 73.237474],
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

    let RectangleMarkers = [

    ];

    for (let i = 0; i < markers.length; i++) {
      const marker = this.markersService.radiusByCenter([lat, lng]);
      var circle = new ymaps.Circle([
        marker,
        2
      ],{
        hintContent: '1'
      },{
        draggable: false,
        fillColor: ColorAir.Well,
        fillOpacity: 0.8
      });
      myMap.geoObjects.add(circle);
    }

    // for (let i = 0; i < markers.length; i++) {
    //   this.sensorsService.getSensordAir(markers[i])
    a.forEach(i => {
      this.sensorsService.getSensordAir([i.lat, i.lng])
        .subscribe(res => {
          Object.keys(res).forEach(arr => {
            if (arr === 'list'){
              Object.keys(res[arr]).forEach(_arr => {
                var circle = new ymaps.Circle([
                  [i.lat, i.lng],
                  1000
                ]);
                myMap.geoObjects.add(circle);
              })
            }
          }
        )
    })
  });
    // for (let i = 0; i < a.length; i++) {
    //   this.sensorsService.getSensordAir(a[i])
    //     .subscribe(res => {
    //       Object.keys(res).forEach(arr => {
    //         if (arr === 'list'){
    //           Object.keys(res[arr]).forEach(_arr => {
    //             var circle = new ymaps.Circle([
    //               markers[i],
    //               1000
    //             ],{
    //               balloonContent:
    //                 `
    //                   <h2>Прогноз индекса загрязненности воздуха</h2>
    //                   <div class="card" style="width: 100%;">
    //                     <div class="card-body">
    //                       <h3 class="card-title">
    //                         Прогноз на ${moment().format('l')}
    //                       </h3>
    //                       <p class="card-text">Скоро здесь будет прогноз..</p>
    //                     </div>
    //                   </div>
    //                 `,
    //               hintContent: `Индекс загрязненности: ${res[arr][_arr].main.aqi}`
    //             },{
    //               draggable: false,
    //               fillColor:
    //                 res[arr][_arr].main.aqi == 1
    //                 ? ColorAir.Well
    //                 : res[arr][_arr].main.aqi == 2
    //                 ? ColorAir.Medium
    //                 : res[arr][_arr].main.aqi == 3
    //                 ? ColorAir.Bad
    //                 : res[arr][_arr].main.aqi == 4
    //                 ? ColorAir.VeryBad : ColorAir.VeryVeryBad,
    //               fillOpacity: 0.8,
    //               strokeColor:
    //                 res[arr][_arr].main.aqi == 1
    //                 ? ColorAir.Well
    //                 : res[arr][_arr].main.aqi == 2
    //                 ? ColorAir.Medium
    //                 : res[arr][_arr].main.aqi == 3
    //                 ? ColorAir.Bad
    //                 : res[arr][_arr].main.aqi == 4
    //                 ? ColorAir.VeryBad : ColorAir.VeryVeryBad
    //             });
    //             myMap.geoObjects.add(circle)
                // myMap.geoObjects.add(new ymaps.GeoObject({
                //   geometry: {
                //     type: "Point",
                //     coordinates: markers[i]
                //   },
                //   properties: {
                //     iconContent: res[arr][_arr].main.aqi
                //   }
                // }));
    //           })
    //         }
    //       });
    //     })
    // }

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
