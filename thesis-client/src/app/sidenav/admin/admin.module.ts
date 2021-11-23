import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminComponent } from './admin.component';
import { AdminPanelElnoksegComponent } from './admin-panel-types/admin-panel-elnokseg/admin-panel-elnokseg.component';
import { AdminPanelKabinetComponent } from './admin-panel-types/admin-panel-kabinet/admin-panel-kabinet.component';
import { AdminPanelKuldottgyulesComponent } from './admin-panel-types/admin-panel-kuldottgyules/admin-panel-kuldottgyules.component';
import { AdminPanelKozeletikComponent } from './admin-panel-types/admin-panel-kozeletik/admin-panel-kozeletik.component';
import { AdminPanelIrodaComponent } from './admin-panel-types/admin-panel-iroda/admin-panel-iroda.component';
import { AdminPanelBufekComponent } from './admin-panel-types/admin-panel-bufek/admin-panel-bufek.component';
import { AdminPanelBelepokartyaComponent } from './admin-panel-types/admin-panel-belepokartya/admin-panel-belepokartya.component';
import { AdminPanelSorompoComponent } from './admin-panel-types/admin-panel-sorompo/admin-panel-sorompo.component';
import { AdminPanelRegisztracioComponent } from "./admin-panel-types/admin-panel-regisztracio/admin-panel-regisztracio.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    AdminComponent,
    AdminPanelElnoksegComponent,
    AdminPanelKabinetComponent,
    AdminPanelKuldottgyulesComponent,
    AdminPanelKozeletikComponent,
    AdminPanelIrodaComponent,
    AdminPanelBufekComponent,
    AdminPanelBelepokartyaComponent,
    AdminPanelSorompoComponent,
    AdminPanelRegisztracioComponent
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule {

}

