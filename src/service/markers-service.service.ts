import { Injectable } from '@angular/core';
import {LimitCoordinate} from "../app/shared/enums";

@Injectable()
export class MarkersService {
  constructor() {}
  /* Получение радиуса по центру */
  public radiusByCenter(center): number[] {
    const radius = 10;
    var y0 = center[0];
    var x0 = center[1];
    var rd = radius / 111300;

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

    const distance_x = this.distance(center[0], center[1], newlat, newlon).toFixed(2);
    const distance_y = this.distance(center[0], center[1], newlat, newlon2).toFixed(2);

    return [newlat, newlon];
  }

  public distance(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }

  public randomCircle(): void {
    const onDataSubmit = (e) => {
      if (e) e.preventDefault();

      //updates min and max radius
      const minRadius = 10;
      const maxRadius = 10;

      //clears circles
      let circles = [];

      //every one second this code is repeated
      const phase = setInterval(() => {
        // circles.push(new Circle(data.x, data.y, data.rad));
        circles[circles.length - 1].draw();
      }, 1);
    }
  }

  /* рандом квадраты по координатам */
  public addRectangle(center): number[] {
    const rectangle_h = 200;
    const rectangle_w = 300;

    return [0]
  }
}
