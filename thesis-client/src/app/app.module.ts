import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { OsztondijakModule } from './osztondijak/osztondijak.module';
import { SzervezetModule } from './szervezet/szervezet.module';
import { SzolgaltatasokModule } from './szolgaltatasok/szolgaltatasok.module';
import { AtlathatosagModule } from './atlathatosag/atlathatosag.module';
import { SidenavModule } from './sidenav/sidenav.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HirekComponent } from './hirek/hirek.component';
import { HirekSliderComponent } from './hirek/hirek-slider/hirek-slider.component';
import { HirekElementComponent } from './hirek/hirek-element/hirek-element.component';
import { UlesekComponent } from './ulesek/ulesek.component';
import { UlesekNavbarComponent } from './ulesek/ulesek-navbar/ulesek-navbar.component';
import { UlesekElementComponent } from './ulesek/ulesek-element/ulesek-element.component';
import { SzervezetElnoksegComponent } from './szervezet/szervezet-elnokseg/szervezet-elnokseg.component';
import { SzervezetKabinetComponent } from './szervezet/szervezet-kabinet/szervezet-kabinet.component';
import { SzervezetBizottsagokComponent } from './szervezet/szervezet-bizottsagok/szervezet-bizottsagok.component';
import { SzervezetKuldottgyulesComponent } from './szervezet/szervezet-kgy/szervezet-kgy.component';
import { AtlathatosagNavbarComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek-navbar/atlathatosag-navbar.component';
import { AtlathatosagJegyzokonyvekFilesComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek-files/atlathatosag-jegyzokonyvek-files.component';
import { AtlathatosagJegyzokonyvekComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek.component';
import { AtlathatosagPalyazatokComponent } from './atlathatosag/atlathatosag-palyazatok/atlathatosag-palyazatok.component';
import { AtlathatosagPalyazatokFilesComponent } from './atlathatosag/atlathatosag-palyazatok/atlathatosag-palyazatok-files/atlathatosag-palyazatok-files.component';
import { AtlathatosagBeszamolokComponent } from './atlathatosag/atlathatosag-beszamolok/atlathatosag-beszamolok.component';
import { AtlathatosagBeszamolokFilesComponent } from './atlathatosag/atlathatosag-beszamolok/atlathatosag-beszamolok-files/atlathatosag-beszamolok-files.component';
import { AtlathatosagKozeletikComponent } from './atlathatosag/atlathatosag-kozeletik/atlathatosag-kozeletik.component';
import { OsztondijakTanulmanyiComponent } from './osztondijak/osztondijak-tanulmanyi/osztondijak-tanulmanyi.component';
import { OsztondijakRendszocComponent } from './osztondijak/osztondijak-rendszoc/osztondijak-rendszoc.component';
import { OsztondijakRendkivuliszocComponent } from './osztondijak/osztondijak-rendkivuliszoc/osztondijak-rendkivuliszoc.component';
import { OsztondijakAlaptamComponent } from './osztondijak/osztondijak-alaptam/osztondijak-alaptam.component';
import { OsztondijakRendkariComponent } from './osztondijak/osztondijak-rendkari/osztondijak-rendkari.component';
import { OsztondijakEgyszerikariComponent } from './osztondijak/osztondijak-egyszerikari/osztondijak-egyszerikari.component';
import { SzolgaltatasokBelepokartyaComponent } from './szolgaltatasok/szolgaltatasok-belepokartya/szolgaltatasok-belepokartya.component';
import { SzolgaltatasokSorompoComponent } from './szolgaltatasok/szolgaltatasok-sorompo/szolgaltatasok-sorompo.component';
import { SzolgaltatasokEtkezokComponent } from './szolgaltatasok/szolgaltatasok-etkezok/szolgaltatasok-etkezok.component';
import { SzolgaltatasokNyitvatartasComponent } from './szolgaltatasok/szolgaltatasok-nyitvatartas/szolgaltatasok-nyitvatartas.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    HirekComponent,
    HirekSliderComponent,
    HirekElementComponent,
    UlesekComponent,
    UlesekNavbarComponent,
    UlesekElementComponent,
    SzervezetElnoksegComponent,
    SzervezetKabinetComponent,
    SzervezetBizottsagokComponent,
    SzervezetKuldottgyulesComponent,
    AtlathatosagNavbarComponent,
    AtlathatosagJegyzokonyvekFilesComponent,
    AtlathatosagJegyzokonyvekComponent,
    AtlathatosagPalyazatokComponent,
    AtlathatosagPalyazatokFilesComponent,
    AtlathatosagBeszamolokComponent,
    AtlathatosagBeszamolokFilesComponent,
    AtlathatosagKozeletikComponent,
    OsztondijakAlaptamComponent,
    OsztondijakRendszocComponent,
    OsztondijakRendkivuliszocComponent,
    OsztondijakEgyszerikariComponent,
    OsztondijakRendkariComponent,
    OsztondijakTanulmanyiComponent,
    SzolgaltatasokBelepokartyaComponent,
    SzolgaltatasokSorompoComponent,
    SzolgaltatasokEtkezokComponent,
    SzolgaltatasokNyitvatartasComponent,
    BejelentkezesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    NgxPaginationModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    SzervezetModule,
    OsztondijakModule,
    SzolgaltatasokModule,
    AtlathatosagModule,
    SidenavModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
