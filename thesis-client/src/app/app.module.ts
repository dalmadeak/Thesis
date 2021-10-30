import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { SzervezetKuldottgyulesComponent } from './szervezet/szervezet-kgy/szervezet-kgy.component';
import { AtlathatosagComponent } from './atlathatosag/atlathatosag.component';
import { AtlathatosagNavbarComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek-navbar/atlathatosag-navbar.component';
import { AtlathatosagJegyzokonyvekFilesComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek-files/atlathatosag-jegyzokonyvek-files.component';
import { AtlathatosagJegyzokonyvekComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek.component';
import { AtlathatosagPalyazatokComponent } from './atlathatosag/atlathatosag-palyazatok/atlathatosag-palyazatok.component';
import { AtlathatosagPalyazatokFilesComponent } from './atlathatosag/atlathatosag-palyazatok/atlathatosag-palyazatok-files/atlathatosag-palyazatok-files.component';
import { AtlathatosagBeszamolokComponent } from './atlathatosag/atlathatosag-beszamolok/atlathatosag-beszamolok.component';
import { AtlathatosagBeszamolokFilesComponent } from './atlathatosag/atlathatosag-beszamolok/atlathatosag-beszamolok-files/atlathatosag-beszamolok-files.component';


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
    SzervezetBizottsagokComponent,
    SzervezetKuldottgyulesComponent,
    AtlathatosagComponent,
    AtlathatosagNavbarComponent,
    AtlathatosagJegyzokonyvekFilesComponent,
    AtlathatosagJegyzokonyvekComponent,
    AtlathatosagPalyazatokComponent,
    AtlathatosagPalyazatokFilesComponent,
    AtlathatosagBeszamolokComponent,
    AtlathatosagBeszamolokFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgImageSliderModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
