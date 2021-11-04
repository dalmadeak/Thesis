import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlathatosagBeszamolokComponent } from './atlathatosag/atlathatosag-beszamolok/atlathatosag-beszamolok.component';
import { AtlathatosagJegyzokonyvekComponent } from './atlathatosag/atlathatosag-jegyzokonyvek/atlathatosag-jegyzokonyvek.component';
import { AtlathatosagKozeletikComponent } from './atlathatosag/atlathatosag-kozeletik/atlathatosag-kozeletik.component';
import { AtlathatosagPalyazatokComponent } from './atlathatosag/atlathatosag-palyazatok/atlathatosag-palyazatok.component';
import { HirekComponent } from './hirek/hirek.component';
import { OsztondijakAlaptamComponent } from './osztondijak/osztondijak-alaptam/osztondijak-alaptam.component';
import { OsztondijakEgyszerikariComponent } from './osztondijak/osztondijak-egyszerikari/osztondijak-egyszerikari.component';
import { OsztondijakRendkariComponent } from './osztondijak/osztondijak-rendkari/osztondijak-rendkari.component';
import { OsztondijakRendkivuliszocComponent } from './osztondijak/osztondijak-rendkivuliszoc/osztondijak-rendkivuliszoc.component';
import { OsztondijakRendszocComponent } from './osztondijak/osztondijak-rendszoc/osztondijak-rendszoc.component';
import { OsztondijakTanulmanyiComponent } from './osztondijak/osztondijak-tanulmanyi/osztondijak-tanulmanyi.component';
import { PageNotFoundComponent } from './pagenotfound/page-not-found/page-not-found.component';
import { SzervezetBizottsagokComponent } from './szervezet/szervezet-bizottsagok/szervezet-bizottsagok.component';
import { SzervezetElnoksegComponent } from './szervezet/szervezet-elnokseg/szervezet-elnokseg.component';
import { SzervezetKabinetComponent } from './szervezet/szervezet-kabinet/szervezet-kabinet.component';
import { SzervezetKuldottgyulesComponent } from './szervezet/szervezet-kgy/szervezet-kgy.component';
import { SzolgaltatasokBelepokartyaComponent } from './szolgaltatasok/szolgaltatasok-belepokartya/szolgaltatasok-belepokartya.component';
import { SzolgaltatasokEtkezokComponent } from './szolgaltatasok/szolgaltatasok-etkezok/szolgaltatasok-etkezok.component';
import { SzolgaltatasokNyitvatartasComponent } from './szolgaltatasok/szolgaltatasok-nyitvatartas/szolgaltatasok-nyitvatartas.component';
import { SzolgaltatasokSorompoComponent } from './szolgaltatasok/szolgaltatasok-sorompo/szolgaltatasok-sorompo.component';
import { UlesekComponent } from './ulesek/ulesek.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/hirek',
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
    path: 'szervezet/elnokseg',
    component: SzervezetElnoksegComponent,
    pathMatch: 'full'
  },
  {
    path: 'szervezet/kabinet',
    component: SzervezetKabinetComponent,
    pathMatch: 'full'
  },
  {
    path: 'szervezet/bizottsagok',
    component: SzervezetBizottsagokComponent,
    pathMatch: 'full'
  },
  {
    path: 'szervezet/kgy',
    component: SzervezetKuldottgyulesComponent,
    pathMatch: 'full'
  },
  {
    path: 'atlathatosag/jegyzokonyvek',
    component: AtlathatosagJegyzokonyvekComponent,
    pathMatch: 'full'
  },
  {
    path: 'atlathatosag/palyazatok',
    component: AtlathatosagPalyazatokComponent,
    pathMatch: 'full'
  },
  {
    path: 'atlathatosag/beszamolok',
    component: AtlathatosagBeszamolokComponent,
    pathMatch: 'full'
  },
  {
    path: 'atlathatosag/kozeletik',
    component: AtlathatosagKozeletikComponent,
    pathMatch: 'full'
  },
  {
    path: 'osztondijak/alaptamogatas',
    component: OsztondijakAlaptamComponent,
    pathMatch: 'full'
  },
  {
    path: 'osztondijak/rendkivuli-szoc',
    component: OsztondijakRendkivuliszocComponent,
    pathMatch: 'full'
  },
  {
    path: 'osztondijak/rendszeres-szoc',
    component: OsztondijakRendszocComponent,
    pathMatch: 'full'
  },
  {
    path: 'osztondijak/rendszeres-kari',
    component: OsztondijakRendkariComponent,
    pathMatch: 'full'
  },
  {
    path: 'osztondijak/egyszeri-kari',
    component: OsztondijakEgyszerikariComponent,
    pathMatch: 'full'
  },
  {
    path: 'osztondijak/tanulmanyi',
    component: OsztondijakTanulmanyiComponent,
    pathMatch: 'full'
  },
  {
    path: 'szolgaltatasok/sorompo',
    component: SzolgaltatasokSorompoComponent,
    pathMatch: 'full'
  },
  {
    path: 'szolgaltatasok/belepokartya',
    component: SzolgaltatasokBelepokartyaComponent,
    pathMatch: 'full'
  },
  {
    path: 'szolgaltatasok/bufek',
    component: SzolgaltatasokEtkezokComponent,
    pathMatch: 'full'
  },
  {
    path: 'szolgaltatasok/iroda',
    component: SzolgaltatasokNyitvatartasComponent,
    pathMatch: 'full'
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
