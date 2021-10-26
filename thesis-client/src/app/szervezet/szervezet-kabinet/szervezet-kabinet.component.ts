import { Component } from "@angular/core";

@Component({
  selector: 'app-szervezet-kabinet',
  templateUrl: './szervezet-kabinet.component.html',
  styleUrls: ['./szervezet-kabinet.component.css']
})
export class SzervezetKabinetComponent {
  kabinetObject = [
  {
    name: 'Szűcs József Nándor',
    position: 'Animátorkoordinátor',
    contact: 'animator@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Ilea Patrik',
    position: 'Informatikai referens',
    contact: 'admin@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Árva Lúcia Borbála',
    position: 'Külügyi főmentor',
    contact: 'kulugyimentor@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Hosek Henrietta',
    position: 'Médiareferens',
    contact: 'media@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Miklósi László Dávid',
    position: 'Mentorkoordinátor',
    contact: 'mentor@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Horváth Boglárka Brigitta',
    position: 'Szombathelyi referens',
    contact: 'sektanulmany@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Nagy Gergő',
    position: 'Sportreferens',
    contact: 'sport@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Betöltetlen...',
    position: 'Szakterületi rendezvénykoordinátor',
    contact: 'szakrendezveny@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Nagy Bendegúz',
    position: 'Tanárképzési referens',
    contact: 'tanarkepzes@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Babos Zselyke Enikő',
    position: 'Titkár',
    contact: 'titkar@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  },
  {
    name: 'Horváth Kristóf Tibor',
    position: 'Tudományos referens',
    contact: 'tudomany@ikhok.elte.hu',
    image: '../../../assets/images/profile-picture.png'
  }]
}
