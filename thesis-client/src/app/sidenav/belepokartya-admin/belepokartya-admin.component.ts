import { Component } from '@angular/core';
import { faCheck, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-belepokartya-admin',
  templateUrl: './belepokartya-admin.component.html',
  styleUrls: ['./belepokartya-admin.component.css']
})
export class BelepokartyaAdminComponent {

  faComment = faComment;
  faCheck = faCheck;

  belepokartyaObject = [
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    email: 'peter@gmail.com',
    studentId: '12345678910',
    card: '11111111',
    permission: 'IKHALLG',
    registerDate: '2021.11.04.',
    returnDate: '-',
    reason: 'pls',
    isApproved: true
  },
  {
    name: 'Nagy Péter2',
    neptun: 'ABC123',
    email: 'peter@gmail.com',
    studentId: '12345678910',
    card: '11111111',
    permission: 'IKHÖK1',
    registerDate: '2021.11.04.',
    returnDate: '-',
    reason: 'pls',
    isApproved: true
  },
  {
    name: 'Nagy Péter3',
    neptun: 'ABC123',
    email: 'peter@gmail.com',
    studentId: '12345678910',
    card: '11111111',
    permission: 'IKHÖK1',
    registerDate: '2021.11.04.',
    returnDate: '2021.12.05.',
    reason: 'pls',
    isApproved: true
  },
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    email: 'peter@gmail.com',
    studentId: '12345678910',
    card: '11111111',
    permission: 'IKHÖK1',
    registerDate: '2021.11.04.',
    returnDate: '-',
    reason: 'plsplsplsplsplsplsplsp lsplsplsplsplsplsp lsplsplsplsplsplsplsplsplspls',
    isApproved: true
  },
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    email: 'peter@gmail.com',
    studentId: '12345678910',
    card: '11111111',
    permission: 'IKHÖK2',
    registerDate: '2021.11.04.',
    returnDate: '-',
    reason: 'pls',
    isApproved: true
  },
  {
    name: 'Nagy Péter',
    neptun: 'ABC123',
    email: 'peter@gmail.com',
    studentId: '12345678910',
    card: '11111111',
    permission: 'IKHALLG',
    registerDate: '2021.11.04.',
    returnDate: '-',
    reason: 'pls',
    isApproved: true
  },
  ];

  ujKeresekObject = [
  {
    name: 'Approve me Péter',
    neptun: 'ABC123',
    email: 'asd@gmail.com',
    studentId: '12345678910',
    card: '-',
    permission: '-',
    registerDate: '2021.11.04.',
    returnDate: '-',
    reason: 'pls',
    isApproved: false
  }
  ];
}
