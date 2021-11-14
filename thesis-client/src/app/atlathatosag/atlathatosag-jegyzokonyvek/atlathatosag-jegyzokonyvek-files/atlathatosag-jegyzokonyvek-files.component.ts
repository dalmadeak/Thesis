import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Jegyzokonyvek } from '../jegyzokonyvek.model';
import { map } from 'rxjs/operators'
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-atlathatosag-jegyzokonyvek-files',
  templateUrl: './atlathatosag-jegyzokonyvek-files.component.html',
  styleUrls: ['../../atlathatosag.component.css']
})
export class AtlathatosagJegyzokonyvekFilesComponent implements OnInit {
  @Input() filterData: any;
  p : number = 1;

  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;
  faEdit = faPencilAlt;
  faDelete = faTrash;

  private jegyzokonyvekObject : Jegyzokonyvek[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.jegyzokonyvekObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/jegyzokonyvek')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            committee: post.committee,
            title: post.title,
            decisionDate: post.decisionDate,
            date: post.date,
            files: post.files
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.jegyzokonyvekObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.http.delete('http://localhost:3000/api/jegyzokonyvek/' + postId)
      .subscribe(() => {
        const updatedPost = this.jegyzokonyvekObject.filter(post => post._id !== postId);
        this.jegyzokonyvekObject = updatedPost;
      })
  }

  onSortByName(){
    return this.jegyzokonyvekObject.sort((a,b) => (a.title > b.title) ? 1 : -1);
  }

  onSortByMeetingDate(){
    return this.jegyzokonyvekObject.sort((a,b) => (a.decisionDate > b.decisionDate) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.jegyzokonyvekObject.sort((a,b) => (a.date > b.date) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    return fileName.substr(fileName.indexOf('.'));
  }

  filterObject(data : Array<any>) {
    let copyOfObject = data.slice().reverse();
    if (this.filterData !== null && this.filterData !== '') {
      copyOfObject = copyOfObject.filter(el => el.committee == this.filterData.id)
    }
    return copyOfObject;
  }
}
