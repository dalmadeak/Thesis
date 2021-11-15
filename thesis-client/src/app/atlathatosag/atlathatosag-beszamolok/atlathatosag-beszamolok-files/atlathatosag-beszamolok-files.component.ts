import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Beszamolok } from '../beszamolok.model';
import { map } from 'rxjs/operators'
import { HttpClient } from "@angular/common/http";
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-atlathatosag-beszamolok-files',
  templateUrl: './atlathatosag-beszamolok-files.component.html',
  styleUrls: ['../../atlathatosag.component.css']
})
export class AtlathatosagBeszamolokFilesComponent implements OnInit{

  p : number = 1;

  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private beszamolokObject : Beszamolok[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.beszamolokObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/beszamolok')
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
        this.beszamolokObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/beszamolok/' + postId)
      .subscribe(() => {
        const updatedPost = this.beszamolokObject.filter(post => post._id !== postId);
        this.beszamolokObject = updatedPost;
      })
  }

  onSortByName(){
    return this.beszamolokObject.sort((a,b) => (a.title > b.title) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.beszamolokObject.sort((a,b) => (a.date > b.date) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    return fileName.substr(fileName.indexOf('.'));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }

}
