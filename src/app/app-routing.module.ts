import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YandexMapsComponent} from "./yandex-maps/yandex-maps.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'app-yandex-maps', component: YandexMapsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
