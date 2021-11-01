import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-atlathatosag-jegyzokonyvek',
  templateUrl: './atlathatosag-jegyzokonyvek.component.html',
  styleUrls: ['./atlathatosag-jegyzokonyvek.component.css']
})
export class AtlathatosagJegyzokonyvekComponent {
  public filterEvent: any;

  onFilterClicked(event : Event) {
    this.filterEvent = event;
    console.log(this.filterEvent);
  }
}
