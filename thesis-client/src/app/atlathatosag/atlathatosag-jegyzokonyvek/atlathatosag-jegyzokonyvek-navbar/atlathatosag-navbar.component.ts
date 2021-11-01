import { ThrowStmt } from "@angular/compiler";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-atlathatosag-navbar',
  templateUrl: './atlathatosag-navbar.component.html',
  styleUrls: ['./atlathatosag-navbar.component.css']
})
export class AtlathatosagNavbarComponent {
  @Output() filterDocuments: EventEmitter<any> = new EventEmitter();
  public alreadyClicked = false;

  committeesObject = [
    {
      id: 'kgy',
      name: 'Küldöttgyűlés'
    },
    {
      id: 'elnokseg',
      name: 'Elnökség'
    },
    {
      id: 'kabinet',
      name: 'Kabinet'
    },
    {
      id: 'hjb',
      name: 'Hallgatói Jóléti Bizottság'
    },
    {
      id: 'kombiz',
      name: 'Kommunikációs Bizottság'
    },
    {
      id: 'kb',
      name: 'Külügyi Bizottság'
    },
    {
      id: 'szb',
      name: 'Szervező Bizottság'
    },
    {
      id: 'tb',
      name: 'Tanulmányi Bizottság'
    },
    {
      id: 'eb',
      name: 'Ellenőrző Bizottság'
    },
    {
      id: 'vb',
      name: 'Választási Bizottság'
    }
  ];

  onClick(id : any) {
    this.filterDocuments.emit(id);
  }
}
