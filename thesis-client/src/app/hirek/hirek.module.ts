import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from "@angular/forms";
import { NgImageSliderModule } from 'ng-image-slider';
import { NgModule } from "@angular/core";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';

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

