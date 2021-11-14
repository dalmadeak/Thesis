import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Hirek } from '../hirek.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hirek-element',
  templateUrl: './hirek-element.component.html',
  styleUrls: ['./hirek-element.component.css']
})
export class HirekElementComponent implements OnInit{
  faEdit = faPencilAlt;
  faDelete = faTrash;

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
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
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

  deletePost(postId : string) {
    this.http.delete('http://localhost:3000/api/hirek/' + postId)
      .subscribe(() => {
        const updatedPost = this.hirekObject.filter(post => post._id !== postId);
        this.hirekObject = updatedPost;
      })
  }
}
