import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { SajatBeszamolok } from './sajat-beszamolok.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sajat-beszamolok',
  templateUrl: './sajat-beszamolok.component.html',
  styleUrls: ['./sajat-beszamolok.component.css','../sidenav.component.css']
})
export class SajatBeszamolokComponent {
  p : number = 1;

  faEdit = faPencilAlt;
  faDelete = faTrash;

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

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/havi-beszamolok')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            author: post.author,
            year: post.year,
            month: post.month,
            content: post.content,
            date: post.date
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.myReportsObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.http.delete('http://localhost:3000/api/havi-beszamolok/' + postId)
      .subscribe(() => {
        const updatedPost = this.myReportsObject.filter(post => post._id !== postId);
        this.myReportsObject = updatedPost;
      })
  }

}
