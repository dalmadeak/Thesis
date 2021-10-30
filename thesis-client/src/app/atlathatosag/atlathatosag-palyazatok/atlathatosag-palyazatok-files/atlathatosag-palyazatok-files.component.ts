import { Component } from "@angular/core";
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-atlathatosag-palyazatok-files',
  templateUrl: './atlathatosag-palyazatok-files.component.html',
  styleUrls: ['./atlathatosag-palyazatok-files.component.css']
})
export class AtlathatosagPalyazatokFilesComponent {
  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;

  palyazatokObject = [
  {
    name: 'palyazat2.pdf',
    uploadDate: '2021. október 02.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'palyazat1.pdf',
    uploadDate: '2021. október 15.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'palyazat3.pdf',
    uploadDate: '2021. október 20.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'palyazat5.zip',
    uploadDate: '2021. október 22.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'palyazat4.pdf',
    uploadDate: '2021. október 27.',
    path: '../../../../assets/images/header-background.png'
  }];

  onSortByName(){
    return this.palyazatokObject.sort((a,b) => (a.name > b.name) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.palyazatokObject.sort((a,b) => (a.uploadDate > b.uploadDate) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    console.log(fileName.substr(fileName.indexOf('.')));
    return fileName.substr(fileName.indexOf('.'));
  }
}
