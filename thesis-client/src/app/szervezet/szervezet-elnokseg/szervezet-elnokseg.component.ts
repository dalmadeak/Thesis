import { Component } from "@angular/core";

@Component({
  selector: 'app-szervezet-elnokseg',
  templateUrl: './szervezet-elnokseg.component.html',
  styleUrls: ['./szervezet-elnokseg.component.css']
})
export class SzervezetElnoksegComponent {
  elnoksegObject = [
  {
    name: 'Deák Dalma',
    position: 'Elnök',
    contact: 'elnok@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Borics László Péter',
    position: 'Gazdasági és pályázati ügyekért felelős alelnök',
    contact: 'gazdasag@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Gerely Viktor András',
    position: 'Stratégiai és Innovációs alelnök',
    contact: 'strategia@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Agg Martin',
    position: 'Szombathelyi ügyekért felelős alelnök',
    contact: 'szombathely@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Bognár Viktória',
    position: 'Hallgatói Jóléti Bizottság elnöke',
    contact: 'osztondij@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Kassai Gréta',
    position: 'Kommunikációs Bizottság elnöke',
    contact: 'kommunikacio@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Mészáros Gábor',
    position: 'Külügyi bizottság elnöke',
    contact: 'kulugy@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Fodor Zoltán',
    position: 'Szervező Bizottság elnöke',
    contact: 'rendezveny@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Lajkó Míra',
    position: 'Tanulmányi Bizottság elnöke',
    contact: 'tanulmany@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  }]
}
