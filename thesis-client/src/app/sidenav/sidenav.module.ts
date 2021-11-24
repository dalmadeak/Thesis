import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SidenavRoutingModule } from "./sidenav-routing.module";
import { SidenavComponent } from "./sidenav.component";

import { AdminModule } from "./admin/admin.module";

import { ProfilComponent } from './profil/profil.component';
import { UjBejegyzesComponent } from './uj-bejegyzes/uj-bejegyzes.component';
import { BeszamolokComponent } from './beszamolok/beszamolok.component';
import { BeszamolokOsszegzesComponent } from './beszamolok/beszamolok-osszegzes/beszamolok-osszegzes.component';
import { HatarozatokComponent } from './hatarozatok/hatarozatok.component';
import { HatarozatokFilesComponent } from './hatarozatok/hatarozatok-files/hatarozatok-files.component';
import { HatarozatokNavbarComponent } from './hatarozatok/hatarozatok-navbar/hatarozatok-navbar.component';
import { SorompoAdminComponent } from './sorompo-admin/sorompo-admin.component';
import { BelepokartyaAdminComponent } from './belepokartya-admin/belepokartya-admin.component';
import { SajatBeszamolokComponent } from './sajat-beszamolok/sajat-beszamolok.component';
import { UjBejegyzesHirekComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-hirek/uj-bejegyzes-hirek.component';
import { UjBejegyzesUlesekComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-ulesek/uj-bejegyzes-ulesek.component';
import { UjBejegyzesBeszamolokComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-beszamolok/uj-bejegyzes-beszamolok.component';
import { UjBejegyzesJegyzokonyvekComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-jegyzokonyvek/uj-bejegyzes-jegyzokonyvek.component';
import { UjBejegyzesHatarozatokComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-hatarozatok/uj-bejegyzes-hatarozatok.component';
import { UjBejegyzesPalyazatokComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-palyazatok/uj-bejegyzes-palyazatok.component';
import { UjBejegyzesSajatBeszamolokComponent } from './uj-bejegyzes/uj-bejegyzes-types/uj-bejegyzes-sajat-beszamolok/uj-bejegyzes-sajat-beszamolok.component';

@NgModule({
  imports: [
    CommonModule,
    SidenavRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    TooltipModule,
    AdminModule
  ],
  declarations: [
    SidenavComponent,
    ProfilComponent,
    UjBejegyzesComponent,
    BeszamolokComponent,
    BeszamolokOsszegzesComponent,
    HatarozatokComponent,
    HatarozatokFilesComponent,
    HatarozatokNavbarComponent,
    SorompoAdminComponent,
    BelepokartyaAdminComponent,
    SajatBeszamolokComponent,
    UjBejegyzesHirekComponent,
    UjBejegyzesUlesekComponent,
    UjBejegyzesBeszamolokComponent,
    UjBejegyzesJegyzokonyvekComponent,
    UjBejegyzesHatarozatokComponent,
    UjBejegyzesPalyazatokComponent,
    UjBejegyzesSajatBeszamolokComponent,

  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule {

}

