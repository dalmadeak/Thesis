import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SidenavRoutingModule } from "./sidenav-routing.module";
import { SidenavComponent } from "./sidenav.component";


@NgModule({
  imports: [
    CommonModule,
    SidenavRoutingModule
  ],
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule {

}

