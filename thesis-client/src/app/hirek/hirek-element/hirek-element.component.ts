import { Component } from "@angular/core";


@Component({
  selector: 'app-hirek-element',
  templateUrl: './hirek-element.component.html',
  styleUrls: ['./hirek-element.component.css']
})
export class HirekElementComponent {
  hirekObject = [{
    id: '0001',
    title: 'First post!',
    content: 'This is the first post\'s content! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCcccccccccccccccccccccccccccccccccccccccccccccccAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCccccccccccccccccccccccccccccccccccccccccccccccccccCCCCCCCCCCCCCCCD',
    date: '2021.10.23. 18:00'
  }, {
    id: '0002',
    title: 'Second post!',
    content: 'This is the second post\'s content!',
    date: '2021.10.23. 18:10'
  }, {
    id: '0003',
    title: 'Third post!',
    content: 'This is the third post\'s content!',
    date: '2021.10.24. 18:25'
  }, {
    id: '0004',
    title: 'Fourth post!',
    content: 'This is the fourth post\'s content!',
    date: '2021.10.24. 18:45'
  }];
}
