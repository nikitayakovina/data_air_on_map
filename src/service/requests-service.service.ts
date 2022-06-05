import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class RequestsService {
    private _rootURL = '/api';
    constructor(private http: HttpClient){}

    public getForecasts(center: any): Observable<any> {
        return this.http.get(this._rootURL + `/getForecasts:${center}`);
    }

    public getDataByPolygon(): Observable<any> {
      return this.http.get('assets/map.json');
    }
}
