import { Component } from "@angular/core";


@Component({
  selector: 'app-ulesek-element',
  templateUrl: './ulesek-element.component.html',
  styleUrls: ['./ulesek-element.component.css']
})
export class UlesekElementComponent {
  /* committees */
  /* kgy, elnokseg, kabinet, hjb, kombiz, kb, szb, tb, eb, vb*/

  // Ülések type object for content title
  committeeTypesObject = [
  {
    name: 'kgy',
    title: 'Küldöttgyűlés'
  },
  {
    name: 'elnokseg',
    title: 'Elnökség'
  },
  {
    name: 'kabinet',
    title: 'Kabinet'
  },
  {
    name: 'hjb',
    title: 'Hallgatói Jóléti Bizottság'
  },
  {
    name: 'kombiz',
    title: 'Kommunikációs Bizottság'
  },
  {
    name: 'kb',
    title: 'Külügyi Bizottság'
  },
  {
    name: 'szb',
    title: 'Szervező Bizottság'
  },
  {
    name: 'tb',
    title: 'Tanulmányi Bizottság'
  },
  {
    name: 'eb',
    title: 'Ellenőrző Bizottság'
  },
  {
    name: 'vb',
    title: 'Választási Bizottság'
  }];

  ulesTypesArray = ['rendes', 'rendkívüli', 'azonnali'];

  ulesekObject = [{
    id: '0001',
    committee: 'kgy',
    type:  this.ulesTypesArray[0],
    meetingDate: '2021. október 25. 18:00',
    postDate: '2021. október 23. 16:00',
    author: 'elnok@ikhok.elte.hu'
  }, {
    id: '0002',
    committee: 'elnokseg',
    type:  this.ulesTypesArray[2],
    meetingDate: '2021. október 26. 18:00',
    postDate: '2021. október 22. 16:00',
    author: 'elnok@ikhok.elte.hu'
  }, {
    id: '0003',
    committee: 'hjb',
    type:  this.ulesTypesArray[0],
    meetingDate: '2021. október 27. 18:00',
    postDate: '2021. október 23. 16:00',
    author: 'osztondij@ikhok.elte.hu'
  }, {
    id: '0004',
    committee: 'elnokseg',
    type:  this.ulesTypesArray[1],
    meetingDate: '2021. október 28. 18:00',
    postDate: '2021. október 26. 16:00',
    author: 'kulugy@ikhok.elte.hu'
  }];

  getProperty(obj : Object, property : string){
    return(Object.values(obj).find((x) => {
      return x.name === property;
    })).title;
  }
}
