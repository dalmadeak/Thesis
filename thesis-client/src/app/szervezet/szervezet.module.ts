import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SzervezetRoutingModule } from "./szervezet-routing.module";

import { SzervezetComponent } from "./szervezet.component";
import { SzervezetElnoksegComponent } from "./szervezet-elnokseg/szervezet-elnokseg.component";
import { SzervezetKabinetComponent } from "./szervezet-kabinet/szervezet-kabinet.component";
import { SzervezetBizottsagokComponent } from "./szervezet-bizottsagok/szervezet-bizottsagok.component";
import { SzervezetKuldottgyulesComponent } from "./szervezet-kgy/szervezet-kgy.component";


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    SzervezetRoutingModule
  ],
  declarations: [
    SzervezetComponent,
    SzervezetElnoksegComponent,
    SzervezetKabinetComponent,
    SzervezetBizottsagokComponent,
    SzervezetKuldottgyulesComponent,
  ],
  exports: [
    SzervezetComponent
  ]
})
export class SzervezetModule {

}
