import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtlathatosagBeszamolokComponent } from './atlathatosag-beszamolok/atlathatosag-beszamolok.component';
import { AtlathatosagJegyzokonyvekComponent } from './atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek.component';
import { AtlathatosagKozeletikComponent } from './atlathatosag-kozeletik/atlathatosag-kozeletik.component';
import { AtlathatosagPalyazatokComponent } from './atlathatosag-palyazatok/atlathatosag-palyazatok.component';

const routes: Routes = [
  {
    path: 'jegyzokonyvek',
    component: AtlathatosagJegyzokonyvekComponent,
  },
  {
    path: 'beszamolok',
    component: AtlathatosagBeszamolokComponent,
  },
  {
    path: 'palyazatok',
    component: AtlathatosagPalyazatokComponent,
  },
  {
    path: 'kozeletik',
    component: AtlathatosagKozeletikComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [RouterModule]
})
export class AtlathatosagRoutingModule { }
