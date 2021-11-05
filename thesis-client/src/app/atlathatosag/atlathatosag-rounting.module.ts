import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AtlathatosagJegyzokonyvekComponent } from './atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek.component';
import { AtlathatosagBeszamolokComponent } from './atlathatosag-beszamolok/atlathatosag-beszamolok.component';
import { AtlathatosagPalyazatokComponent } from './atlathatosag-palyazatok/atlathatosag-palyazatok.component';
import { AtlathatosagKozeletikComponent } from './atlathatosag-kozeletik/atlathatosag-kozeletik.component';

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
