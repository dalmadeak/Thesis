import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HirekComponent } from './hirek/hirek.component';
import { HirekSliderComponent } from './hirek/hirek-slider/hirek-slider.component';
import { HirekElementComponent } from './hirek/hirek-element/hirek-element.component';
import { UlesekComponent } from './ulesek/ulesek.component';
import { UlesekNavbarComponent } from './ulesek/ulesek-navbar/ulesek-navbar.component';
import { UlesekElementComponent } from './ulesek/ulesek-element/ulesek-element.component';
import { SzervezetComponent } from './szervezet/szervezet.component';
import { SzervezetElnoksegComponent } from './szervezet/szervezet-elnokseg/szervezet-elnokseg.component';
import { SzervezetKabinetComponent } from './szervezet/szervezet-kabinet/szervezet-kabinet.component';
import { SzervezetBizottsagokComponent } from './szervezet/szervezet-bizottsagok/szervezet-bizottsagok.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HirekComponent,
    HirekSliderComponent,
    HirekElementComponent,
    UlesekComponent,
    UlesekNavbarComponent,
    UlesekElementComponent,
    SzervezetComponent,
    SzervezetElnoksegComponent,
    SzervezetKabinetComponent,
    SzervezetBizottsagokComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
