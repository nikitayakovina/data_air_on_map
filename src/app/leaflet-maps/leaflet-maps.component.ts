import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {LocationService} from "../../service/location-service.service";

@Component({
  selector: 'app-leaflet-maps',
  templateUrl: './leaflet-maps.component.html',
  styleUrls: ['./leaflet-maps.component.css']
})
export class LeafletMapsComponent implements AfterViewInit {
  private _map;
  private _center = [];
  private initMap(): void {
    this.locationService.getPositions().then(result => {
      this._center.push(result.lat, result.lng);
    });
    this._map = new L.map('map', {
      center: [54.988480, 73.324234],
      zoom: 14
    })
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this._map);

    fetch('../../img/map.geojson')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        L.geoJSON(data).addTo(this._map);
      })

    // this._map.on("contextmenu", (ev) => {
    //   console.log(ev.latlng.toString())
    //   L.marker(ev.latlng).addTo(this._map)
    // })
    // let markerMyPosition = L.marker([54.988480, 73.324234]).addTo(this._map);
    // let popup = markerMyPosition.bindPopup('<h1>hello</h1>');
  }
  constructor(private locationService: LocationService) { }
  public ngAfterViewInit(): void {
    this.initMap();
  }

}
