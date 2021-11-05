import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SzervezetElnoksegComponent } from './szervezet-elnokseg/szervezet-elnokseg.component';
import { SzervezetKabinetComponent } from './szervezet-kabinet/szervezet-kabinet.component';
import { SzervezetBizottsagokComponent } from './szervezet-bizottsagok/szervezet-bizottsagok.component';
import { SzervezetKuldottgyulesComponent } from './szervezet-kgy/szervezet-kgy.component';


const routes: Routes = [
  {
    path: 'elnokseg',
    component: SzervezetElnoksegComponent,
  },
  {
    path: 'kabinet',
    component: SzervezetKabinetComponent,
  },
  {
    path: 'bizottsagok',
    component: SzervezetBizottsagokComponent,
  },
  {
    path: 'kgy',
    component: SzervezetKuldottgyulesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [RouterModule]
})
export class SzervezetRoutingModule { }
