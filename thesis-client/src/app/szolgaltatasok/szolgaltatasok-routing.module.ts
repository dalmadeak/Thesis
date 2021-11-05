import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SzolgaltatasokBelepokartyaComponent } from './szolgaltatasok-belepokartya/szolgaltatasok-belepokartya.component';
import { SzolgaltatasokSorompoComponent } from './szolgaltatasok-sorompo/szolgaltatasok-sorompo.component';
import { SzolgaltatasokEtkezokComponent } from './szolgaltatasok-etkezok/szolgaltatasok-etkezok.component';
import { SzolgaltatasokNyitvatartasComponent } from './szolgaltatasok-nyitvatartas/szolgaltatasok-nyitvatartas.component';



const routes: Routes = [
  {
    path: 'belepokartya',
    component: SzolgaltatasokBelepokartyaComponent,
    pathMatch: 'full'
  },
  {
    path: 'sorompo',
    component: SzolgaltatasokSorompoComponent,
    pathMatch: 'full'
  },
  {
    path: 'bufek',
    component: SzolgaltatasokEtkezokComponent,
    pathMatch: 'full'
  },
  {
    path: 'iroda',
    component: SzolgaltatasokNyitvatartasComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [RouterModule]
})
export class SzolgaltatasokRoutingModule { }
