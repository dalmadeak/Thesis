import { Component, ElementRef, ViewChild } from '@angular/core';
import { faTrash, faPencilAlt, faFileImport, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-beszamolok',
  templateUrl: './beszamolok.component.html',
  styleUrls: ['./beszamolok.component.css']
})
export class BeszamolokComponent{
  @ViewChild('target') targetRef: ElementRef | undefined;
  monthlyReport : Array<Object> = [];

  faEdit = faPencilAlt;
  faDelete = faTrash;
  faView = faList;
  faSummarize = faFileImport;

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

  async onClickView(data: Array<Object>) {
    await this.addMonthToSummary(data);
    this.scrollToChild();
  }

  addMonthToSummary(data: Array<Object>) {
    this.monthlyReport = data;
  }

  scrollToChild(): void {
   this.targetRef?.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
