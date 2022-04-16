import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import { YandexMapsComponent } from './yandexMaps/yandex-maps/yandex-maps.component';
import {AngularYandexMapsModule} from "angular8-yandex-maps";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    YandexMapsComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
