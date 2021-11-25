import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";

import { HirekComponent } from "./hirek.component";
import { HirekElementComponent } from "./hirek-element/hirek-element.component";
import { HirekSliderComponent } from "./hirek-slider/hirek-slider.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgImageSliderModule,
    NgxPaginationModule,
    RouterModule,
    NgxSpinnerModule
  ],
  declarations: [
    HirekComponent,
    HirekSliderComponent,
    HirekElementComponent
  ],
  exports: [
    HirekComponent
  ]
})
export class HirekModule {

}

