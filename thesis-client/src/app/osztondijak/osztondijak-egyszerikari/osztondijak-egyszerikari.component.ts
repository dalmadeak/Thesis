import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osztondijak-egyszerikari',
  templateUrl: './osztondijak-egyszerikari.component.html',
  styleUrls: ['./osztondijak-egyszerikari.component.css']
})
export class OsztondijakEgyszerikariComponent{

  filesObject = [
    {
      name: 'Egyszeri_sport_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Egyszeri_kulturalis_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Egyszeri_tudomanyos_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Egyszeri_szakmai_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'Egyszeri_kozeleti_21_22.png',
      path: '../../../assets/images/header-background.png'
    }
  ];

}
