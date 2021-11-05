import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AtlathatosagComponent } from "./atlathatosag.component";
import { AtlathatosagRoutingModule } from "./atlathatosag-rounting.module";

@NgModule({
  imports: [
    CommonModule,
    AtlathatosagRoutingModule
  ],
  declarations: [
    AtlathatosagComponent
  ],
  exports: [
    AtlathatosagComponent
  ]
})
export class AtlathatosagModule {

}

