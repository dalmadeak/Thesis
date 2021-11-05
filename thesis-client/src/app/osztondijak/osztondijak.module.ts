import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OsztondijakRoutingModule } from "./osztondijak-routing.module";
import { OsztondijakComponent } from "./osztondijak.component";


@NgModule({
  imports: [
    CommonModule,
    OsztondijakRoutingModule
  ],
  declarations: [
    OsztondijakComponent
  ],
  exports: [
    OsztondijakComponent
  ]
})
export class OsztondijakModule {

}

