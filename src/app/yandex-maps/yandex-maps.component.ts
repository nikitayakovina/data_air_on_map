import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../service/location-service.service";

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
    this.locationService.getPositions().then(result => {
      this._center.push(result.lat, result.lng);
    });
  }

}
