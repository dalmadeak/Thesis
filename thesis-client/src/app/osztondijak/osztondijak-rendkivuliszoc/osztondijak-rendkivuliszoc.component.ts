import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osztondijak-rendkivuliszoc',
  templateUrl: './osztondijak-rendkivuliszoc.component.html',
  styleUrls: ['./osztondijak-rendkivuliszoc.component.css']
})
export class OsztondijakRendkivuliszocComponent {

  filesObject = [
    {
      name: 'Rendkivuli_szoctam_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'BNO_kodok.png',
      path: '../../../assets/images/header-background.png'
    }
  ];

}
