import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import { map } from "rxjs/operators";
import { Hatarozat } from "../hatarozatok.model";

@Component({
  selector: 'app-hatarozatok-files',
  templateUrl: './hatarozatok-files.component.html',
  styleUrls: ['./hatarozatok-files.component.css','../../sidenav.component.css']
})
export class HatarozatokFilesComponent {
  @Input() filterData: any;
  p : number = 1;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  private hatarozatokObject : Hatarozat[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.hatarozatokObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/hatarozatok')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            committee: post.committee,
            number: post.number,
            decisionDate: post.decisionDate,
            content: post.content,
            mandate: post.mandate,
            vote: post.vote,
            date: post.date,
            files: post.files,
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.hatarozatokObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.http.delete('http://localhost:3000/api/hatarozatok/' + postId)
      .subscribe(() => {
        const updatedPost = this.hatarozatokObject.filter(post => post._id !== postId);
        this.hatarozatokObject = updatedPost;
      })
  }

  filterObject(data : Array<any>) {
    let copyOfObject = data.slice().reverse();
    if (this.filterData !== null && this.filterData !== '') {
      copyOfObject = copyOfObject.filter(el => el.committee == this.filterData.id)
    }
    return copyOfObject;
  }

}
