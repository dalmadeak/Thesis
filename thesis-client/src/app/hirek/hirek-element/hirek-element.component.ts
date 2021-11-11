import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Hirek } from '../hirek.model';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-hirek-element',
  templateUrl: './hirek-element.component.html',
  styleUrls: ['./hirek-element.component.css']
})
export class HirekElementComponent implements OnInit{
  months = ["január", "február", "március", "április", "május", "június",
  "július", "augusztus", "szeptember", "október", "november", "december"];

  p: number = 1;

  private hirekObject : Hirek[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.hirekObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/hirek')
      .pipe(map(postData => {
        return postData.posts.map((post: { _id: any; title: string; content: string; date: Date; }) => {
          console.log(post.date.getFullYear())
         // let transformedDate = (post.date.getFullYear() + '. ' + this.months[post.date.getMonth()] + ' ' + post.date.getDay() );
          return {
            id: post._id,
            title: post.title,
            content: post.content,
            date: post.date
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.hirekObject = finalPosts;
      });
  }
}
