import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import { YandexMapsComponent } from './yandex-maps/yandex-maps.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import { MainPageComponent } from './main-page/main-page.component';
import { ForecastComponent } from './forecast/forecast.component';
import {LocationService} from "../service/location-service.service";
import {SensorsService} from "../service/sensors-service.service";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    YandexMapsComponent,
    MainPageComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [LocationService, SensorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
