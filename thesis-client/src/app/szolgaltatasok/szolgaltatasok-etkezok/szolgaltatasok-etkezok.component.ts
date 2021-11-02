import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-szolgaltatasok-etkezok',
  templateUrl: './szolgaltatasok-etkezok.component.html',
  styleUrls: ['./szolgaltatasok-etkezok.component.css']
})
export class SzolgaltatasokEtkezokComponent {

  dinerObject = [
    {
      name: 'Déli büfé',
      brief: 'A déli épület nyugati bejárata mellett található.',
      openHours: ['8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00']
    },
    {
      name: 'Galéria büfé',
      brief: 'Az északi épület déli ajtaján belépve az első emeleten található.',
      openHours: ['8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00']
    },
    {
      name: 'Meleg büfé',
      brief: 'Az északi épület északi bejáratán belépve egyenesen, a folyosón található a Campus-faloda mellett.',
      openHours: ['8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00']
    },
    {
      name: 'Campus-faloda',
      brief: 'Az északi épület északi bejáratán belépve egyenesen, a folyosón található a Meleg büfé mellett.',
      openHours: ['8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00','8:00-17:00']
    },
    {
      name: 'Kocka büfé',
      brief: 'Az egyetemtől 2 perc sétára található a Magyar Tudósok körútja és a Warga László út kereszteződésénél.',
      openHours: ['8:00-19:00','8:00-19:00','8:00-19:00','8:00-19:00','8:00-19:00']
    }
  ]

}
