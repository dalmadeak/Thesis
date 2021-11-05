import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-szolgaltatasok-nyitvatartas',
  templateUrl: './szolgaltatasok-nyitvatartas.component.html',
  styleUrls: ['./szolgaltatasok-nyitvatartas.component.css']
})
export class SzolgaltatasokNyitvatartasComponent {

  officeObject = [
    {
      name: 'Déli iroda',
      brief: 'A déli irodánk a déli épületben található, megközelíteni a nyugati bejárat melletti lépcsőnél lehet az első emeleten.',
      openHours: ['10:00-16:00','10:00-16:00','10:00-16:00','10:00-16:00','10:00-16:00']
    },
    {
      name: 'Északi iroda',
      brief: 'Az északi irodánk az északi épület déli ajtajánál közelíthető meg, a csigalépcsőn lesétálva a -1. szintre.',
      openHours: ['10:00-16:00','10:00-16:00','10:00-16:00','10:00-16:00','10:00-16:00']
    }
  ]

}
