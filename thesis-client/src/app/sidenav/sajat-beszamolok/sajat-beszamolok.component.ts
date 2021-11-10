import { Component } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sajat-beszamolok',
  templateUrl: './sajat-beszamolok.component.html',
  styleUrls: ['./sajat-beszamolok.component.css','../sidenav.component.css']
})
export class SajatBeszamolokComponent {
  p : number = 1;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  myReportsObject = [
    {
      year: '2021',
      month: 'május',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'augusztus',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'szeptember',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'október',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'november',
      content: 'Nagyon szeretem a kiskutyákat'
    },
  ];

}
