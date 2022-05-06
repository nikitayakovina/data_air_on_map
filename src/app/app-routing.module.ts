import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForecastComponent} from "./forecast/forecast.component";
import {YandexMapsComponent} from "./yandex-maps/yandex-maps.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {LeafletMapsComponent} from "./leaflet-maps/leaflet-maps.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'app-leaflet-maps', component: LeafletMapsComponent },
  { path: 'app-yandex-maps', component: YandexMapsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
