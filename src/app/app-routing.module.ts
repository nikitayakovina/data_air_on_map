import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YandexMapsComponent} from "./yandex-maps/yandex-maps.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ForecastComponent} from "./forecast/forecast.component";

const routes: Routes = [
  { path: 'yandex-maps', component: YandexMapsComponent },
  { path: '', component: MainPageComponent },
  { path: 'forecast', component: ForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
