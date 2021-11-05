import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OsztondijakAlaptamComponent } from './osztondijak-alaptam/osztondijak-alaptam.component';
import { OsztondijakEgyszerikariComponent } from './osztondijak-egyszerikari/osztondijak-egyszerikari.component';
import { OsztondijakRendkariComponent } from './osztondijak-rendkari/osztondijak-rendkari.component';
import { OsztondijakRendkivuliszocComponent } from './osztondijak-rendkivuliszoc/osztondijak-rendkivuliszoc.component';
import { OsztondijakRendszocComponent } from './osztondijak-rendszoc/osztondijak-rendszoc.component';
import { OsztondijakTanulmanyiComponent } from './osztondijak-tanulmanyi/osztondijak-tanulmanyi.component';

const routes: Routes = [
  {
    path: 'alaptamogatas',
    component: OsztondijakAlaptamComponent,
    pathMatch: 'full'
  },
  {
    path: 'rendszeres-szoc',
    component: OsztondijakRendszocComponent,
    pathMatch: 'full'
  },
  {
    path: 'rendkivuli-szoc',
    component: OsztondijakRendkivuliszocComponent,
    pathMatch: 'full'
  },
  {
    path: 'rendszeres-kari',
    component: OsztondijakRendkariComponent,
    pathMatch: 'full'
  },
  {
    path: 'egyszeri-kari',
    component: OsztondijakEgyszerikariComponent,
    pathMatch: 'full'
  },
  {
    path: 'tanulmanyi',
    component: OsztondijakTanulmanyiComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [RouterModule]
})
export class OsztondijakRoutingModule { }
