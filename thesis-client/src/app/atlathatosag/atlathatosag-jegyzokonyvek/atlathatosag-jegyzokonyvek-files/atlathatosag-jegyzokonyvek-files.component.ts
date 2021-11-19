import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private jegyzokonyvekObject : Jegyzokonyvek[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
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
            postType: post.postType,
            committee: post.committee,
            title: post.title,
            decisionDate: post.decisionDate.split(' ')[0],
            decisionTime: post.decisionDate.split(' ')[1],
            date: post.date.split(' ')[0],
            time: post.date.split(' ')[1],
            file: post.file
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.jegyzokonyvekObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
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

  filterObject(data : Array<any>) {
    let copyOfObject = data.slice().reverse();
    if (this.filterData !== null && this.filterData !== '') {
      copyOfObject = copyOfObject.filter(el => el.committee == this.filterData.id)
    }
    return copyOfObject;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
