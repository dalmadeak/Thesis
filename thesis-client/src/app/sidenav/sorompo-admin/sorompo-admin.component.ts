import { Component } from "@angular/core";
import { faCheck, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sorompo-admin',
  templateUrl: './sorompo-admin.component.html',
  styleUrls: ['./sorompo-admin.component.css']
})
export class SorompoAdminComponent{
  faComment = faComment;
  faCheck = faCheck;

  sorompoObject = [
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    plate: 'CBA321',
    type: 'Renault Twingo',
    card: '11111111',
    mobile: '+36301234567',
    email: 'peter@gmail.com',
    registerDate: '2021.11.04.',
    semester: '2021-2022-1',
    reason: 'pls',
    isApprover: false
  },
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    plate: 'CBA321',
    type: 'Renault Twingo',
    card: '11111111',
    mobile: '+36301234567',
    email: 'peter@gmail.com',
    registerDate: '2021.11.04.',
    semester: '2021-2022-1',
    reason: 'pls',
    isApprover: false
  },
  {
    name: 'Nagy Péterxd',
    neptun: 'ABC123',
    plate: 'CBA321',
    type: 'Renault Twingo',
    card: '11111111',
    mobile: '+36301234567',
    email: 'peter@gmail.com',
    registerDate: '2021.11.04.',
    semester: '2021-2022-1',
    reason: 'plsplsplsplsplsplsplsplsplsplsplspls plsplsplsplsplsplsplsplsplsplsplspls plsplsplsplsplsplsplspl splsplspls',
    isApprover: false
  },
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    plate: 'CBA321',
    type: 'Renault Twingo',
    card: '11111111',
    mobile: '+36301234567',
    email: 'peter@gmail.com',
    registerDate: '2021.11.04.',
    semester: '2021-2022-1',
    reason: 'pls',
    isApprover: false
  },
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    plate: 'CBA321',
    type: 'Renault Twingo',
    card: '11111111',
    mobile: '+36301234567',
    email: 'peter@gmail.com',
    registerDate: '2021.11.04.',
    semester: '2021-2022-1',
    reason: 'pls',
    isApprover: false
  },
  {
    name: 'Abdulmuttalib Abdul Kherim',
    neptun: 'ABC123',
    plate: 'CBA321',
    type: 'Renault Twingo',
    card: '11111111',
    mobile: '+36301234567',
    email: 'abdulkherim1998@gmail.com',
    registerDate: '2021.11.04.',
    semester: '2021-2022-1',
    reason: 'pls',
    isApprover: true
  }];

}
