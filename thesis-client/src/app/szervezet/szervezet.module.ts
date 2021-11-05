import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SzervezetComponent } from "./szervezet.component";
import { SzervezetRoutingModule } from "./szervezet-routing.module";


@NgModule({
  imports: [
    CommonModule,
    SzervezetRoutingModule
  ],
  declarations: [
    SzervezetComponent
  ],
  exports: [
    SzervezetComponent
  ]
})
export class SzervezetModule {

}
