import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SzolgaltatasokComponent } from "./szolgaltatasok.component";
import { SzolgaltatasokRoutingModule } from "./szolgaltatasok-routing.module";


@NgModule({
  imports: [
    CommonModule,
    SzolgaltatasokRoutingModule
  ],
  declarations: [
    SzolgaltatasokComponent
  ],
  exports: [
    SzolgaltatasokComponent
  ]
})
export class SzolgaltatasokModule {

}

