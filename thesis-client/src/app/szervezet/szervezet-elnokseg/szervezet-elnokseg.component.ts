import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";

import { Elnokseg } from "./elnokseg.model";
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/elnokseg';

@Component({
  selector: 'app-szervezet-elnokseg',
  templateUrl: './szervezet-elnokseg.component.html',
  styleUrls: ['./szervezet-elnokseg.component.css']
})
export class SzervezetElnoksegComponent implements OnInit {
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private elnoksegObject : Elnokseg[] = [];
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
    return [...this.elnoksegObject];
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
            position: post.position,
            email: post.email,
            file: post.file
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.elnoksegObject = finalPosts;
        this.spinner.hide();
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete(BACKEND_URL + '/' + postId)
      .subscribe(() => {
        const updatedPost = this.elnoksegObject.filter(post => post._id !== postId);
        this.elnoksegObject = updatedPost;
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
