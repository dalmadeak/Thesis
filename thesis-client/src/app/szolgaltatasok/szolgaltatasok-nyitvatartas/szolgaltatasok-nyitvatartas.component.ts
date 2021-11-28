import { HttpClient } from "@angular/common/http";
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";

import { Iroda } from "./iroda.model";
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/iroda';

@Component({
  selector: 'app-szolgaltatasok-nyitvatartas',
  templateUrl: './szolgaltatasok-nyitvatartas.component.html',
  styleUrls: ['./szolgaltatasok-nyitvatartas.component.css']
})
export class SzolgaltatasokNyitvatartasComponent implements OnInit{

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;

  private irodaObject : Iroda[] = [];
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
    return [...this.irodaObject].slice().reverse();
  }

  getPosts() {
    this.spinner.show();
    this.http.get<{message: string, posts: any }>(BACKEND_URL)
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            name: post.name,
            brief: post.brief,
            openHours: post.openHours,
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.irodaObject = finalPosts;
        this.spinner.hide();
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete(BACKEND_URL + '/' + postId)
      .subscribe(() => {
        const updatedPost = this.irodaObject.filter(post => post._id !== postId);
        this.irodaObject = updatedPost;
      })
  }

  getAuthLevel() {
    return this.authLevel;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }

}
