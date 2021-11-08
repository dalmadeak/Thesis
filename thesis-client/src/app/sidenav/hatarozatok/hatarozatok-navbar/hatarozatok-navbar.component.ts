import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-hatarozatok-navbar',
  templateUrl: './hatarozatok-navbar.component.html',
  styleUrls: ['./hatarozatok-navbar.component.css']
})
export class HatarozatokNavbarComponent {
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
