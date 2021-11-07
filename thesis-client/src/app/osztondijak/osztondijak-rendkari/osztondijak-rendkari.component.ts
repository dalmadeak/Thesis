import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osztondijak-rendkari',
  templateUrl: './osztondijak-rendkari.component.html',
  styleUrls: ['../osztondijak.component.css']
})
export class OsztondijakRendkariComponent {
  filesObject = [
    {
      name: 'Rendszeres_sport_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Rendszeres_kulturalis_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Rendszeres_tudomanyos_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Rendszeres_szakmai_21_22.png',
      path: '../../../assets/images/header-background.png'
    }
  ];

}
