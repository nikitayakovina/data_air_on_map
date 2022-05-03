import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    private _rootURL = '/api';
    constructor(private http: HttpClient){}

    public getForecasts() {
        return this.http.get(this._rootURL + '/arrForecast');
    }
    
    public addForecast(forecast: any) {
        return this.http.post(this._rootURL + '/forecast', {forecast});
    }
}