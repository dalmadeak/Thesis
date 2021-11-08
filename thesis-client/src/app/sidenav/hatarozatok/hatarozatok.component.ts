import { Component } from '@angular/core';

@Component({
  selector: 'app-hatarozatok',
  templateUrl: './hatarozatok.component.html',
  styleUrls: ['./hatarozatok.component.css']
})
export class HatarozatokComponent{

  public filterEvent: any;

  onFilterClicked(event : Object) {
    this.filterEvent = event;
  }

}
