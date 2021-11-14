import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { UjBejegyzesComponent } from './uj-bejegyzes/uj-bejegyzes.component';
import { BeszamolokComponent } from './beszamolok/beszamolok.component';
import { BelepokartyaAdminComponent } from './belepokartya-admin/belepokartya-admin.component';
import { SorompoAdminComponent } from './sorompo-admin/sorompo-admin.component';
import { HatarozatokComponent } from './hatarozatok/hatarozatok.component';
import { SajatBeszamolokComponent } from './sajat-beszamolok/sajat-beszamolok.component';


const routes: Routes = [
  {
    path: 'profil',
    component: ProfilComponent,
    pathMatch: 'full'
  },
  {
    path: 'uj-bejegyzes',
    component: UjBejegyzesComponent,
    pathMatch: 'full'
  },
  {
    path: 'uj-bejegyzes/szerkesztes/:id',
    component: UjBejegyzesComponent,
    pathMatch: 'full'
  },
  {
    path: 'beszamolok',
    component: BeszamolokComponent,
    pathMatch: 'full'
  },
  {
    path: 'beszamolok/sajat',
    component: SajatBeszamolokComponent,
    pathMatch: 'full'
  },
  {
    path: 'hatarozatok',
    component: HatarozatokComponent,
    pathMatch: 'full'
  },
  {
    path: 'belepokartya-admin',
    component: BelepokartyaAdminComponent,
    pathMatch: 'full'
  },
  {
    path: 'sorompo-admin',
    component: SorompoAdminComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
