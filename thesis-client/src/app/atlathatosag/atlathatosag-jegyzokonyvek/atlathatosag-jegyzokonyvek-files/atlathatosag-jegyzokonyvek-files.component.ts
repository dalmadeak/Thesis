import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "src/app/bejelentkezes/user.service";
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
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private jegyzokonyvekObject : Jegyzokonyvek[] = [];
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    this.getPosts();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this. userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  getObject() {
    return [...this.jegyzokonyvekObject].slice().reverse();
  }

  getPosts() {
    this.spinner.show();
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/jegyzokonyvek')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            committee: post.committee,
            title: post.title,
            decisionDate: post.decisionDate,
            date: post.date,
            file: post.file
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.jegyzokonyvekObject = finalPosts;
        this.spinner.hide();
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/jegyzokonyvek/' + postId)
      .subscribe(() => {
        const updatedPost = this.jegyzokonyvekObject.filter(post => post._id !== postId);
        this.jegyzokonyvekObject = updatedPost;
      })
  }

  getAuthLevel() {
    return this.authLevel;
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
    this.modalRef.hide();
  }
}
