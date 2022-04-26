import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LocationService} from "../../service/location-service.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.css']
})
export class YandexMapsComponent implements OnInit {
  private _center: Array<number> = [];
  @ViewChild('yamaps') el: ElementRef;
  public zoom: number = 12;
  public get center(): Array<number> {
    return this._center;
  }
  constructor(private locationService: LocationService,
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document) {}

  public ngOnInit(): void {
    // let script = this._renderer2.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'https://api-maps.yandex.ru/2.1/?apikey=16caec4a-da4d-4848-8051-2bcd5b73ab83&lang=RU';
    // this._renderer2.appendChild(this._document.body, script);

    // this.locationService.getPositions().then(result => {
    //   this._center.push(result.lng, result.lat);
    // });

    // let map = new ymaps.Map('map', {
    //   center: this._center,
    //   zoom: this.zoom
    // })
  }
}
