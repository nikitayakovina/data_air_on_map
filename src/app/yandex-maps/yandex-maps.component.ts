import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../service/location-service.service";
import {SensorsService} from "../../service/sensors-service.service";
import {ColorAir} from "../shared/enums";
import * as moment from "moment";
import {RequestsService} from "../../service/requests-service.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent implements OnInit {
  public colorWell = ColorAir.Well;
  public colorMedium = ColorAir.Medium;
  public colorBad = ColorAir.Bad;
  public colorVeryBad = ColorAir.VeryBad;
  public colorVeryVeryBad = ColorAir.VeryVeryBad;
  private _center: Array<number> = [];
  private _dataPolygon: any;
  public get center(): Array<number> {
    return this._center;
  }
  constructor(
    private locationService: LocationService,
    private sensorsService: SensorsService,
    private requestsService: RequestsService,
    private http: HttpClient) {}

  public ngOnInit(): void {
    this.locationService.getPositions().then(result => {
      this._center.push(result.lat, result.lng);
      ymaps.ready(() => {
        this.dataByPolygon();
        this.yandexMaps(result.lat, result.lng);
      });
    });
  }

  public doForecasts(coord: any): void {
    this.requestsService.getForecasts(coord).subscribe(res => {
      return res;
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

    this._dataPolygon.features.forEach(res => {
      res.geometry.coordinates.forEach(coord => {
        const newCoord = this.centerByPolygon(coord);
        this.sensorsService.getSensordAir(newCoord)
          .subscribe(sensor => {
            Object.keys(sensor).forEach(_sensor => {
              if (_sensor === 'list') {
                Object.keys(sensor[_sensor]).forEach(__sensor => {
                  coord.map(i => [i[0], i[1]] = [i[1], i[0]]);
                  var myPolygon4 = new ymaps.Polygon(
                    [coord],
                    {
                      balloonContent:
                      `
                      <h2>Прогноз индекса загрязненности воздуха</h2>
                      <div class="card" style="width: 100%;">
                        <div class="card-body">
                          <h3 class="card-title">
                            Прогноз на ${moment().format('l')}
                          </h3>
                          <p class="card-text">Скоро здесь будет прогноз..</p>
                        </div>
                      </div>
                    `
                    ,
                      hintContent: `
                        <div class="card">
                          <h4 class="card-title" style="margin: 10px">Индекс загрязненности: <b>${sensor[_sensor][__sensor].main.aqi.toString()}</b></h4>
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">Монооксид углерода: <b>${sensor[_sensor][__sensor].components.co} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Оксид азота: <b>${sensor[_sensor][__sensor].components.no} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Двуокись азота: <b>${sensor[_sensor][__sensor].components.no2} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Озон: <b>${sensor[_sensor][__sensor].components.o3} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Оксид серы: <b>${sensor[_sensor][__sensor].components.so2} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Частицы РМ2.5 (мелкие твердые частицы и капли жидкости): <b>${sensor[_sensor][__sensor].components.pm2_5} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Частицы РМ10 (крупные и грубые частицы): <b>${sensor[_sensor][__sensor].components.pm10} мкг/м<sup><small>3</small></sup></b></li>
                            <li class="list-group-item">Аммиак: <b>${sensor[_sensor][__sensor].components.nh3} мкг/м<sup><small>3</small></sup></b></li>
                          </ul>
                        </div>
                      `
                    },
                    {
                    fillColor:
                    sensor[_sensor][__sensor].main.aqi == 1
                    ? ColorAir.Well
                    : sensor[_sensor][__sensor].main.aqi == 2
                    ? ColorAir.Medium
                    : sensor[_sensor][__sensor].main.aqi == 3
                    ? ColorAir.Bad
                    : sensor[_sensor][__sensor].main.aqi == 4
                    ? ColorAir.VeryBad : ColorAir.VeryVeryBad,
                    strokeWidth: 1,
                    opacity: 0.8
                  });

                  myPolygon4.events
                    .add('mouseenter', () => {
                      myPolygon4.options.set('strokeColor', '#dc3545');
                      myPolygon4.options.set('strokeWidth', 3);
                    })
                    .add('mousedown', () => {
                      this.doForecasts(newCoord);
                    })
                    .add('mouseleave', ()=> {
                      myPolygon4.options.unset('strokeColor');
                      myPolygon4.options.unset('strokeWidth');
                    })
                  myMap.geoObjects.add(myPolygon4);
                })
              }
            })
          });
      });
    });
  }

  public centerByPolygon(coord: number[][]): Array<number> {
    var minX, maxX, minY, maxY;
    for (var i = 0; i < coord.length; i++)
    {
        minX = (coord[i][0] < minX || minX == null) ? coord[i][0] : minX;
        maxX = (coord[i][0] > maxX || maxX == null) ? coord[i][0] : maxX;
        minY = (coord[i][1] < minY || minY == null) ? coord[i][1] : minY;
        maxY = (coord[i][1] > maxY || maxY == null) ? coord[i][1] : maxY;
    }
    return [(minY + maxY) / 2, (minX + maxX) / 2];
  }

  public dataByPolygon(): any {
    this.requestsService.getDataByPolygon().subscribe(data => {
      this._dataPolygon = data;
    });
  }
}
