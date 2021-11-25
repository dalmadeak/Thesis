import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";

import { HirekModule } from './hirek/hirek.module';
import { UlesekModule } from './ulesek/ulesek.module';
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
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';

import { AuthInterceptor } from './sidenav/admin/admin-panel-types/admin-panel-regisztracio/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    BejelentkezesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgImageSliderModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    HirekModule,
    UlesekModule,
    SzervezetModule,
    OsztondijakModule,
    SzolgaltatasokModule,
    AtlathatosagModule,
    SidenavModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
