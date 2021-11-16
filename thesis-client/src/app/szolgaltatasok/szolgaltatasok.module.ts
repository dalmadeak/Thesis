import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SzolgaltatasokRoutingModule } from "./szolgaltatasok-routing.module";

import { SzolgaltatasokComponent } from "./szolgaltatasok.component";
import { SzolgaltatasokBelepokartyaComponent } from "./szolgaltatasok-belepokartya/szolgaltatasok-belepokartya.component";
import { SzolgaltatasokSorompoComponent } from "./szolgaltatasok-sorompo/szolgaltatasok-sorompo.component";
import { SzolgaltatasokEtkezokComponent } from "./szolgaltatasok-etkezok/szolgaltatasok-etkezok.component";
import { SzolgaltatasokNyitvatartasComponent } from "./szolgaltatasok-nyitvatartas/szolgaltatasok-nyitvatartas.component";


@NgModule({
  imports: [
    CommonModule,
    SzolgaltatasokRoutingModule,
    FormsModule
  ],
  declarations: [
    SzolgaltatasokComponent,
    SzolgaltatasokBelepokartyaComponent,
    SzolgaltatasokSorompoComponent,
    SzolgaltatasokEtkezokComponent,
    SzolgaltatasokNyitvatartasComponent,
  ],
  exports: [
    SzolgaltatasokComponent
  ]
})
export class SzolgaltatasokModule {

}

