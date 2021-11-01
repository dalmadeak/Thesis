import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osztondijak-rendszoc',
  templateUrl: './osztondijak-rendszoc.component.html',
  styleUrls: ['./osztondijak-rendszoc.component.css']
})
export class OsztondijakRendszocComponent{

  filesObject = [
    {
      name: 'Rendszeres_szoctam_21_22.png',
      path: '../../../assets/images/header-background.png'
    },
    {
      name: 'BNO_kodok.png',
      path: '../../../assets/images/header-background.png'
    }
  ];

}
