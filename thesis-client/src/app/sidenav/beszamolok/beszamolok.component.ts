import { Component, ElementRef, ViewChild, OnInit, DoCheck } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { SajatBeszamolok } from '../sajat-beszamolok/sajat-beszamolok.model';

import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-beszamolok',
  templateUrl: './beszamolok.component.html',
  styleUrls: ['./beszamolok.component.css']
})
export class BeszamolokComponent implements OnInit{
  @ViewChild('target') targetRef: ElementRef | undefined;
  monthlyReport : Array<Object> = [];
  reportDates: any[] = []

  faEdit = faPencilAlt;
  faDelete = faTrash;
  faView = faList;

  private myReportsObject : SajatBeszamolok[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.myReportsObject].slice().reverse();
  }

  ngDoCheck() {
    this.filterReports();
  }

  getPosts() {
    this.http.get<{posts: any}>('http://localhost:3000/api/havi-beszamolok')
      .pipe(
        map(postData => {
        return postData.posts.map((post: any) => {
          return {
              _id: post._id,
              postType: post.postType,
              author: post.author,
              year: post.year,
              month: post.month,
              content: post.content,
              date: post.date
            }
          })
      }))
      .subscribe((finalPosts) => {
        this.myReportsObject = finalPosts;
      });
  }

  filterReports() {
    let isNew = true;
    for(let element of this.getObject()) {
      isNew = true;
      for(let newDate of this.reportDates) {
        if (newDate.year == element.year && newDate.month == element.month) {
          isNew = false;
        }
      }
      if (isNew) {
        this.reportDates.push(element);
      }
    }
    return this.reportDates;
  }

  onClickView(year: number, month: string) {
    this.monthlyReport = this.getObject().filter( (data: any) => {
      return data.year == year && data.month == month
    })
    this.scrollToChild();
  }

  addMonthToSummary(data: Array<Object>) {
    this.monthlyReport = data;
  }

  scrollToChild(): void {
   this.targetRef?.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
