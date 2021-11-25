import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AtlathatosagRoutingModule } from "./atlathatosag-rounting.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";

import { AtlathatosagComponent } from "./atlathatosag.component";
import { AtlathatosagNavbarComponent } from "./atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek-navbar/atlathatosag-navbar.component";
import { AtlathatosagBeszamolokComponent } from "./atlathatosag-beszamolok/atlathatosag-beszamolok.component";
import { AtlathatosagBeszamolokFilesComponent } from "./atlathatosag-beszamolok/atlathatosag-beszamolok-files/atlathatosag-beszamolok-files.component";
import { AtlathatosagJegyzokonyvekComponent } from "./atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek.component";
import { AtlathatosagJegyzokonyvekFilesComponent } from "./atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek-files/atlathatosag-jegyzokonyvek-files.component";
import { AtlathatosagKozeletikComponent } from "./atlathatosag-kozeletik/atlathatosag-kozeletik.component";
import { AtlathatosagPalyazatokComponent } from "./atlathatosag-palyazatok/atlathatosag-palyazatok.component";
import { AtlathatosagPalyazatokFilesComponent } from "./atlathatosag-palyazatok/atlathatosag-palyazatok-files/atlathatosag-palyazatok-files.component";

@NgModule({
  imports: [
    CommonModule,
    AtlathatosagRoutingModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  declarations: [
    AtlathatosagComponent,
    AtlathatosagNavbarComponent,
    AtlathatosagBeszamolokComponent,
    AtlathatosagBeszamolokFilesComponent,
    AtlathatosagJegyzokonyvekComponent,
    AtlathatosagJegyzokonyvekFilesComponent,
    AtlathatosagKozeletikComponent,
    AtlathatosagPalyazatokComponent,
    AtlathatosagPalyazatokFilesComponent
  ],
  exports: [
    AtlathatosagComponent
  ]
})
export class AtlathatosagModule {

}

