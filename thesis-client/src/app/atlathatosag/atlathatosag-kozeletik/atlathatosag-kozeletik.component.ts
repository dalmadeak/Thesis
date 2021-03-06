import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "src/app/bejelentkezes/user.service";
import { Kozeletik } from "./kozeletik.model";
import { map } from 'rxjs/operators'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/kozeletik';

@Component({
  selector: 'app-atlathatosag-kozeletik',
  templateUrl: './atlathatosag-kozeletik.component.html',
  styleUrls: ['./atlathatosag-kozeletik.component.css']
})
export class AtlathatosagKozeletikComponent implements OnInit{
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  colspan = 3;
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private kozeletikObject : Kozeletik[] = [];
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    this.getPosts();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    if(this.isAuthenticated && this.getAuthLevel() <= 2) {
      this.colspan = 4;
    } else {
      this.colspan = 3;
    }
    this. userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  getObject() {
    return [...this.kozeletikObject];
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
            amount: post.amount
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.kozeletikObject = finalPosts;
        this.spinner.hide();
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete(BACKEND_URL+ '/' + postId)
      .subscribe(() => {
        const updatedPost = this.kozeletikObject.filter(post => post._id !== postId);
        this.kozeletikObject = updatedPost;
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
