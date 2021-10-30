import { Component } from "@angular/core";
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-atlathatosag-jegyzokonyvek-files',
  templateUrl: './atlathatosag-jegyzokonyvek-files.component.html',
  styleUrls: ['./atlathatosag-jegyzokonyvek-files.component.css']
})
export class AtlathatosagJegyzokonyvekFilesComponent {
  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;

  jegyzokonyvekObject = [
  {
    name: 'asd2.pdf',
    meetingDate: '2021. október 10.',
    uploadDate: '2021. október 15.',
    committee: 'kgy',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'asd1.pdf',
    meetingDate: '2021. október 12.',
    uploadDate: '2021. október 15.',
    committee: 'elnokseg',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'asd3.pdf',
    meetingDate: '2021. október 15.',
    uploadDate: '2021. október 20.',
    committee: 'hjb',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'asd5.pdf',
    meetingDate: '2021. október 20.',
    uploadDate: '2021. október 22.',
    committee: 'elnokseg',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'asd4.pdf',
    meetingDate: '2021. október 21.',
    uploadDate: '2021. október 27.',
    committee: 'tb',
    path: '../../../../assets/images/header-background.png'
  }];

  onSortByName(){
    return this.jegyzokonyvekObject.sort((a,b) => (a.name > b.name) ? 1 : -1);
  }

  onSortByMeetingDate(){
    return this.jegyzokonyvekObject.sort((a,b) => (a.meetingDate > b.meetingDate) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.jegyzokonyvekObject.sort((a,b) => (a.uploadDate > b.uploadDate) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    console.log(fileName.substr(fileName.indexOf('.')));
    return fileName.substr(fileName.indexOf('.'));
  }
}
