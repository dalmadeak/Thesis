import { Component, Input } from "@angular/core";
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hatarozatok-files',
  templateUrl: './hatarozatok-files.component.html',
  styleUrls: ['./hatarozatok-files.component.css','../../sidenav.component.css']
})
export class HatarozatokFilesComponent {
  @Input() filterData: any;
  p : number = 1;

  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;

  hatarozatokObject = [
  {
    number: '1/2021/Elnökség',
    decisionDate: '2021. október 10.',
    uploadDate: '2021. október 15.',
    committee: 'elnokseg',
    decision: 'Az ELTE IK HÖK Elnöksége úgy döntött, hogy feloszlatja magát yolo.',
    mandate: '9',
    vote: '9/0/0',
    appendix: ['../../../../assets/images/header-background.png']
  },
  {
    number: '2/2021/Elnökség',
    decisionDate: '2021. október 10.',
    uploadDate: '2021. október 15.',
    committee: 'elnokseg',
    decision: 'Az ELTE IK HÖK Elnöksége úgy döntött, hogy feloszlatja a Kabinetet is.',
    mandate: '9',
    vote: '8/0/0 - 1 online nem szavazott',
    appendix: ['../../../../assets/images/header-background.png']
  },
  {
    number: '1/2021/Kabinet',
    decisionDate: '2021. október 12.',
    uploadDate: '2021. október 18.',
    committee: 'kabinet',
    decision: 'Az ELTE IK HÖK Küldöttgyűlése felhatalmazza az ELTE IK HÖK Elnökét, hogy amennyiben nem tud a Kari Tanács tagok mindegyike valamely ülésen részt venni, akkor az ülés időtartamára a hiányzó tagok helyett a három választott póttag közül delegáljon sorrendben a Kari Tanácsba. A Küldöttgyűlés Miklósi László Dávidot választja harmadik póttagként.',
    mandate: '6',
    vote: '6/0/0',
    appendix: ['../../../../assets/images/header-background.png']
  },
  {
    number: '3/2021/Elnökség',
    decisionDate: '2021. október 11.',
    uploadDate: '2021. október 20.',
    committee: 'elnokseg',
    decision: 'Az ELTE IK HÖK Elnöksége az Informatikai Kar 2021-es gólyatáborának felsőbbéveseinek toborzása céljából a mellékletben található pályázatot írja ki 2021. július 4. 23:59-es határidővel.',
    mandate: '40',
    vote: '38/1/0 - 1 online nem szavazott',
    appendix: ['../../../../assets/images/header-background.png','../../../../assets/images/header-background.png','../../../../assets/images/header-background.png','../../../../assets/images/header-background.png','../../../../assets/images/header-background.png','../../../../assets/images/header-background.png','../../../../assets/images/header-background.png','../../../../assets/images/header-background.png']
  },
  {
    number: '1/2021/Hallgatói Jóléti Bizottság',
    decisionDate: '2021. október 17.',
    uploadDate: '2021. október 17.',
    committee: 'hjb',
    decision: 'Mittomén.',
    mandate: '6',
    vote: '4/2/0',
    appendix: []
  }];

  filterObject(data : Array<any>) {
    let copyOfObject = data.slice().reverse();
    if (this.filterData !== null && this.filterData !== '') {
      copyOfObject = copyOfObject.filter(el => el.committee == this.filterData.id)
    }
    return copyOfObject;
  }

}
