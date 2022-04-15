import {Component, OnInit} from '@angular/core';
import {Coordinates} from "./yandexMaps/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _zoom: number = 12;
  private _center: Array<Coordinates> = [];
  public get center(): Array<Coordinates> {
    return this._center;
  }
  public get zoom(): number {
    return this._zoom;
  }
  constructor() {}

  ngOnInit(): void {
    this.getLocation();
  }
  public getLocation(): void {
    navigator.geolocation.getCurrentPosition(resp => {
      if (resp) {
        this.center.push({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      }
    })
  }
}
