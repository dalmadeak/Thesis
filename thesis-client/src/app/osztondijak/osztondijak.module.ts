import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OsztondijakRoutingModule } from "./osztondijak-routing.module";

import { OsztondijakComponent } from "./osztondijak.component";
import { OsztondijakAlaptamComponent } from "./osztondijak-alaptam/osztondijak-alaptam.component";
import { OsztondijakRendszocComponent } from "./osztondijak-rendszoc/osztondijak-rendszoc.component";
import { OsztondijakRendkivuliszocComponent } from "./osztondijak-rendkivuliszoc/osztondijak-rendkivuliszoc.component";
import { OsztondijakRendkariComponent } from "./osztondijak-rendkari/osztondijak-rendkari.component";
import { OsztondijakEgyszerikariComponent } from "./osztondijak-egyszerikari/osztondijak-egyszerikari.component";
import { OsztondijakTanulmanyiComponent } from "./osztondijak-tanulmanyi/osztondijak-tanulmanyi.component";


@NgModule({
  imports: [
    CommonModule,
    OsztondijakRoutingModule
  ],
  declarations: [
    OsztondijakComponent,
    OsztondijakAlaptamComponent,
    OsztondijakRendszocComponent,
    OsztondijakRendkivuliszocComponent,
    OsztondijakRendkariComponent,
    OsztondijakEgyszerikariComponent,
    OsztondijakTanulmanyiComponent
  ],
  exports: [
    OsztondijakComponent
  ]
})
export class OsztondijakModule {

}

