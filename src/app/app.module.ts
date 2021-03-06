import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from "./app.component";
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {LocationService} from "../service/location-service.service";
import {SensorsService} from "../service/sensors-service.service";
import {MatButtonModule} from "@angular/material/button";
import {TableModule} from "primeng/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {YandexMapsComponent} from './yandex-maps/yandex-maps.component';
import {RequestsService} from "../service/requests-service.service";
import {MainPageComponent} from "./main-page/main-page.component";
const mapConfig: YaConfig = {
  apikey: '2cd6704d-9e98-4e03-b754-681f18196dca',
  lang: 'ru_RU',
};
@NgModule({
  declarations: [
    AppComponent,
    YandexMapsComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    TableModule,
    MatProgressBarModule
  ],
  providers: [LocationService, SensorsService, RequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
