import { Component, Input } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-beszamolok-osszegzes',
  templateUrl: './beszamolok-osszegzes.component.html',
  styleUrls: ['./beszamolok-osszegzes.component.css']
})
export class BeszamolokOsszegzesComponent{
  @Input() summarizeObject : any = [];

  faEdit = faPencilAlt;
  faDelete = faTrash;

  reportsObject = [
    {
      year: '2021',
      month: 'szeptember',
      author: 'Dalma',
      date: '2021. november 4. 23:59',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'szeptember',
      author: 'Ez is Dalma',
      date: '2021. november 4. 23:59',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'szeptember',
      author: 'Ez már nem',
      date: '2021. november 4. 23:59',
      content: 'Nagyon szeretem a kiskutyákat'
    }];
}
