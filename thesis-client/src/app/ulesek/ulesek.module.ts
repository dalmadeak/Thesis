import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { RouterModule } from '@angular/router';

import { UlesekComponent } from "./ulesek.component";
import { UlesekElementComponent } from "./ulesek-element/ulesek-element.component";
import { UlesekNavbarComponent } from "./ulesek-navbar/ulesek-navbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgImageSliderModule,
    NgxPaginationModule,
    RouterModule
  ],
  declarations: [
    UlesekComponent,
    UlesekElementComponent,
    UlesekNavbarComponent
  ],
  exports: [
    UlesekComponent
  ]
})
export class UlesekModule {

}

