import { Component } from "@angular/core";

@Component({
  selector: 'app-atlathatosag-kozeletik',
  templateUrl: './atlathatosag-kozeletik.component.html',
  styleUrls: ['./atlathatosag-kozeletik.component.css']
})
export class AtlathatosagKozeletikComponent {
  kozeletikObject = [
    {
      id: 'elnok',
      name: "Elnök",
      amount: '10.000 Ft'
    },
    {
      id: 'gazd',
      name: "Gazdasági és Pályázati ügyekért felelős alelnök",
      amount: '10.000 Ft'
    },
    {
      id: 'strat',
      name: "Stratégiai és Innovációs alelnök",
      amount: '10.000 Ft'
    },
    {
      id: 'szombathely',
      name: "Szombathelyi ügyekért felelős alelnök",
      amount: '10.000 Ft'
    },
    {
      name: 'Hallgatói Jóléti Bizottság elnöke',
      id: "hjb",
      amount: '10.000 Ft'
    },
    {
      name: 'Kommunikációs Bizottság elnöke',
      id: "kombiz",
      amount: '10.000 Ft'
    },
    {
      name: 'Külügyi Bizottság elnöke',
      id: "kulugy",
      amount: '10.000 Ft'
    },
    {
      name: 'Szervező Bizottság elnöke',
      id: "szb",
      amount: '10.000 Ft'
    },
    {
      name: 'Tanulmányi Bizottság elnöke',
      id: "tb",
      amount: '10.000 Ft'
    },
    {
      name: 'Ellenőrző Bizottság elnöke',
      id: "eb",
      amount: '10.000 Ft'
    },
    {
      name: 'Ellenőrző Bizottság tagja(i)',
      id: "ebt",
      amount: '10.000 Ft'
    },
    {
      name: 'Animátorkoordinátor',
      id: "animator",
      amount: '10.000 Ft'
    },
    {
      name: 'Informatikai referens',
      id: "inforef",
      amount: '10.000 Ft'
    },
    {
      name: 'Külügyi főmentor',
      id: "kbfomentor",
      amount: '10.000 Ft'
    },
    {
      name: 'Médiareferens',
      id: "media",
      amount: '10.000 Ft'
    },
    {
      name: 'Mentorkoordinátor',
      id: "mentor",
      amount: '10.000 Ft'
    },
    {
      name: 'Sportreferens',
      id: "sport",
      amount: '10.000 Ft'
    },
    {
      name: 'Szakterületi rendezvénykoordinátor',
      id: "szakrendezveny",
      amount: '10.000 Ft'
    },
    {
      name: 'Szombathelyi referens',
      id: "sektanulmany",
      amount: '10.000 Ft'
    },
    {
      name: 'Tanárképzési referens',
      id: "tanarkepzes",
      amount: '10.000 Ft'
    },
    {
      name: 'Titkár',
      id: "titkar",
      amount: '10.000 Ft'
    },
    {
      name: 'Tudományos referens',
      id: "tudref",
      amount: '10.000 Ft'
    }
  ];
}
