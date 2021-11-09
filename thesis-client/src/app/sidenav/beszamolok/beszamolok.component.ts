import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faPencilAlt, faFileImport, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-beszamolok',
  templateUrl: './beszamolok.component.html',
  styleUrls: ['./beszamolok.component.css']
})
export class BeszamolokComponent{
  monthlyReport : Array<Object> = [];

  faEdit = faPencilAlt;
  faDelete = faTrash;
  faView = faList;
  faSummarize = faFileImport;

  myReportsObject = [
    {
      year: '2021',
      month: 'május',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'augusztus',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'szeptember',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'október',
      content: 'Nagyon szeretem a kiskutyákat'
    },
    {
      year: '2021',
      month: 'november',
      content: 'Nagyon szeretem a kiskutyákat'
    },
  ];

  reportsObject = [
    {
      year: '2021',
      month: 'szeptember',
      reports: [
        {
          year: '2021',
          month: 'szeptember',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'október',
      reports: [
        {
          year: '2021',
          month: 'október',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'november',
      reports: [
        {
          year: '2021',
          month: 'november',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'szeptember',
      reports: [
        {
          year: '2021',
          month: 'szeptember',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'október',
      reports: [
        {
          year: '2021',
          month: 'október',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'november',
      reports: [
        {
          year: '2021',
          month: 'november',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'szeptember',
      reports: [
        {
          year: '2021',
          month: 'szeptember',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'október',
      reports: [
        {
          year: '2021',
          month: 'október',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'november',
      reports: [
        {
          year: '2021',
          month: 'november',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'szeptember',
      reports: [
        {
          year: '2021',
          month: 'szeptember',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'szeptember',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'október',
      reports: [
        {
          year: '2021',
          month: 'október',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'október',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    },
    {
      year: '2021',
      month: 'november',
      reports: [
        {
          year: '2021',
          month: 'november',
          author: 'Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez is Dalma',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        },
        {
          year: '2021',
          month: 'november',
          author: 'Ez már nem',
          date: '2021. november 4. 23:59',
          content: 'Nagyon szeretem a kiskutyákat'
        }]
    }
];

  onClickView(data: Array<Object>, element: HTMLElement) {
    this.addMonthToSummary(data);
    this.scrollToChild(element);
  }

  addMonthToSummary(data: Array<Object>) {
    this.monthlyReport = data;
  }

  scrollToChild(element: HTMLElement): void {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
