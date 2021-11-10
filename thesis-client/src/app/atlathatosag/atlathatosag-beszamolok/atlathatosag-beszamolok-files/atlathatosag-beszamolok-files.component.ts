import { Component } from "@angular/core";
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-atlathatosag-beszamolok-files',
  templateUrl: './atlathatosag-beszamolok-files.component.html',
  styleUrls: ['../../atlathatosag.component.css']
})
export class AtlathatosagBeszamolokFilesComponent {
  p : number = 1;

  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;

  beszamolokObject = [
  {
    name: 'beszamolo2.pdf',
    uploadDate: '2021. október 02.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'beszamolo1.pdf',
    uploadDate: '2021. október 15.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'beszamolo3.pdf',
    uploadDate: '2021. október 20.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'beszamolo5.zip',
    uploadDate: '2021. október 22.',
    path: '../../../../assets/images/header-background.png'
  },
  {
    name: 'beszamolo4.pdf',
    uploadDate: '2021. október 27.',
    path: '../../../../assets/images/header-background.png'
  }];

  onSortByName(){
    return this.beszamolokObject.sort((a,b) => (a.name > b.name) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.beszamolokObject.sort((a,b) => (a.uploadDate > b.uploadDate) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    return fileName.substr(fileName.indexOf('.'));
  }
}
