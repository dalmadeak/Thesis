import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { HirekComponent } from './hirek/hirek.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UlesekComponent } from './ulesek/ulesek.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/hirek',
    pathMatch: 'full'
  },
  {
    path: 'bejelentkezes',
    component: BejelentkezesComponent,
    pathMatch: 'full'
  },
  {
    path: 'hirek',
    component: HirekComponent,
    pathMatch: 'full'
  },
  {
    path: 'ulesek',
    component: UlesekComponent,
    pathMatch: 'full'
  },
  {
    path: 'szervezet',
    loadChildren: () => import('./szervezet/szervezet.module').then(m => m.SzervezetModule),
  },
  {
    path: 'atlathatosag',
    loadChildren: () => import('./atlathatosag/atlathatosag.module').then(m => m.AtlathatosagModule),
  },
  {
    path: 'osztondijak',
    loadChildren: () => import('./osztondijak/osztondijak.module').then(m => m.OsztondijakModule),
  },
  {
    path: 'szolgaltatasok',
    loadChildren: () => import('./szolgaltatasok/szolgaltatasok.module').then(m => m.SzolgaltatasokModule),
  },
  {
    path: 'sidenav',
    loadChildren: () => import('./sidenav/sidenav.module').then(m => m.SidenavModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
