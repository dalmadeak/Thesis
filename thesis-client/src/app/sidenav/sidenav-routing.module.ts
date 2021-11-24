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
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { ElnoksegGuard } from '../guards/elnokseg.guard';
import { KabinetGuard } from '../guards/kabinet.guard';
import { JkvezetoGuard } from '../guards/jkvezeto.guard';
import { KuldottGuard } from '../guards/kuldott.guard';


const routes: Routes = [
  {
    path: 'profil',
    component: ProfilComponent,
    pathMatch: 'full',
    canActivate: [KuldottGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/szerkesztes/:postType/:id',
    component: AdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'uj-bejegyzes',
    component: UjBejegyzesComponent,
    pathMatch: 'full',
    canActivate: [KabinetGuard]
  },
  {
    path: 'uj-bejegyzes/szerkesztes/:postType/:id',
    component: UjBejegyzesComponent,
    pathMatch: 'full',
    canActivate: [KabinetGuard]
  },
  {
    path: 'beszamolok',
    component: BeszamolokComponent,
    pathMatch: 'full',
    canActivate: [KuldottGuard]
  },
  {
    path: 'beszamolok/sajat',
    component: SajatBeszamolokComponent,
    pathMatch: 'full',
    canActivate: [KabinetGuard]
  },
  {
    path: 'hatarozatok',
    component: HatarozatokComponent,
    pathMatch: 'full',
    canActivate: [JkvezetoGuard]
  },
  {
    path: 'belepokartya-admin',
    component: BelepokartyaAdminComponent,
    pathMatch: 'full',
    canActivate: [ElnoksegGuard]
  },
  {
    path: 'sorompo-admin',
    component: SorompoAdminComponent,
    pathMatch: 'full',
    canActivate: [ElnoksegGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [RouterModule],
  providers: [AdminGuard, ElnoksegGuard, KabinetGuard, JkvezetoGuard, KuldottGuard]
})
export class SidenavRoutingModule { }
