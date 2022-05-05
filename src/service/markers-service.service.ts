import { Injectable } from '@angular/core';
import {LimitCoordinate} from "../app/shared/enums";

@Injectable()
export class MarkersService {
  constructor() {}
  /* добавление рандомно меток */
  public fewMeters(lat, lng): number[] {
    const meters = 2500;
    const coef = meters * 0.0000089;
    const newLat = lat + coef;
    const newLng = lng + coef / Math.cos(newLat * 0.018);
    return [newLat, newLng];
  }

  /* Получение радиуса по центру */
  public radiusByCenter(center): number[] {
    const radius = 2000;
    var markers = [];
    var y0 = center[0];
    var x0 = center[1];
    var rd = radius / 111300;

    // for (let i=0; i < 100; i++){
    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    var newlat = y + y0;
    var newlon = x + x0;
    var newlon2 = xp + x0;
    return [newlat, newlon];
    // markers.push(newlat, newlon)
    // }
  }
}
