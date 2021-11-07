import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-ulesek-navbar',
  templateUrl: './ulesek-navbar.component.html',
  styleUrls: ['./ulesek-navbar.component.css']
})
export class UlesekNavbarComponent {
  @Output() filterDocuments: EventEmitter<Object> = new EventEmitter();

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

  onClick(id : Object): void {
    this.filterDocuments.emit(id);
  }
}
