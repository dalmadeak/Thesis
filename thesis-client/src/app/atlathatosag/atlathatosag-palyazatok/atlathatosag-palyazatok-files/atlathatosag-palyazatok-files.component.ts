import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Palyazatok } from '../palyazatok.model';
import { map } from 'rxjs/operators'
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-atlathatosag-palyazatok-files',
  templateUrl: './atlathatosag-palyazatok-files.component.html',
  styleUrls: ['../../atlathatosag.component.css']
})
export class AtlathatosagPalyazatokFilesComponent implements OnInit{
  p : number = 1;

  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;
  faEdit = faPencilAlt;
  faDelete = faTrash;

  private palyazatokObject : Palyazatok[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.palyazatokObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/palyazatok')
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
        this.palyazatokObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.http.delete('http://localhost:3000/api/palyazatok/' + postId)
      .subscribe(() => {
        const updatedPost = this.palyazatokObject.filter(post => post._id !== postId);
        this.palyazatokObject = updatedPost;
      })
  }

  onSortByName(){
    return this.palyazatokObject.sort((a,b) => (a.title > b.title) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.palyazatokObject.sort((a,b) => (a.date > b.date) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    return fileName.substr(fileName.indexOf('.'));
  }

}
