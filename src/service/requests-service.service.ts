import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestsService {
    private _rootURL = '/api';
    constructor(private http: HttpClient){}

    public getForecasts(center: any) {
        return this.http.get(this._rootURL + `/getForecasts:${center}`);
    }
}
