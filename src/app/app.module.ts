import {Component, NgModule} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import {AppComponent} from "./app.component";
import { YandexMapsComponent } from './yandexMaps/yandex-maps/yandex-maps.component';

@NgModule({
  declarations: [
    AppComponent,
    YandexMapsComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AngularYandexMapsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
