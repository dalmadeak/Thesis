import { Component } from "@angular/core";

@Component({
  selector: 'app-ulesek',
  templateUrl: './ulesek.component.html',
  styleUrls: ['./ulesek.component.css']
})
export class UlesekComponent {
  public filterEvent: any;

  onFilterClicked(event : Object) {
    this.filterEvent = event;
  }
}
