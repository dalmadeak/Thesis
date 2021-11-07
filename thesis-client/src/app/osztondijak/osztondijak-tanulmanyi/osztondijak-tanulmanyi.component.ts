import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osztondijak-tanulmanyi',
  templateUrl: './osztondijak-tanulmanyi.component.html',
  styleUrls: ['../osztondijak.component.css']
})
export class OsztondijakTanulmanyiComponent {

  file = {
    name: 'Tanulmanyi_kiszamitasa.pdf',
    path: '../../../assets/files/Tanulmanyi_kiszamitasa.pdf'
  }
}
