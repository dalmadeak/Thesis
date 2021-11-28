import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Ulesek } from '../ulesek.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { UserService } from "src/app/bejelentkezes/user.service";
import { NgxSpinnerService } from "ngx-spinner";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/ulesek';

@Component({
  selector: 'app-ulesek-element',
  templateUrl: './ulesek-element.component.html',
  styleUrls: ['./ulesek-element.component.css']
})
export class UlesekElementComponent implements OnInit{
  @Input() filterData: any;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;

  p: number = 1;

  private ulesekObject : Ulesek[] = [];
  private userAuthSubs : Subscription | undefined;
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
    return [...this.ulesekObject];
  }

  getPosts() {
    this.spinner.show();
    this.http.get<{message: string, posts: any }>(BACKEND_URL)
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            author: post.author,
            committee: post.committee,
            type: post.type,
            title: post.title,
            content: post.content,
            decisionDate: post.decisionDate,
            date: post.date
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.ulesekObject = finalPosts;
        this.spinner.hide();
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete( BACKEND_URL + '/' + postId)
      .subscribe(() => {
        const updatedPost = this.ulesekObject.filter(post => post._id !== postId);
        this.ulesekObject = updatedPost;
      })
  }

  getAuthLevel() {
    return this.authLevel;
  }

  getProperty(obj : Object, property : string){
    return(Object.values(obj).find((x) => {
      return x.name === property;
    })).title;
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
