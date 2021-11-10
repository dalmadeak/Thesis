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
}
