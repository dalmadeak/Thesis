import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Belepokartya } from '../../szolgaltatasok/szolgaltatasok-belepokartya/belepokartya.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt, faCheck, faComment } from '@fortawesome/free-solid-svg-icons';

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/belepokartya';

@Component({
  selector: 'app-belepokartya-admin',
  templateUrl: './belepokartya-admin.component.html',
  styleUrls: ['./belepokartya-admin.component.css']
})
export class BelepokartyaAdminComponent implements OnInit{
  faEdit = faPencilAlt;
  faDelete = faTrash;
  faComment = faComment;
  faCheck = faCheck;

  modalRef: BsModalRef = new BsModalRef();

  private belepokartyaObject : Belepokartya[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getObject() {
    return [...this.belepokartyaObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>(BACKEND_URL)
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            fullName: post.fullName,
            neptun: post.neptun,
            email: post.email,
            studentId: post.studentId,
            card: post.card,
            permissions: post.permissions,
            date: post.date,
            returnDate: post.returnDate,
            reason: post.reason,
            isApproved: post.isApproved
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.belepokartyaObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete(BACKEND_URL + '/' + postId)
      .subscribe(() => {
        const updatedPost = this.belepokartyaObject.filter(post => post._id !== postId);
        this.belepokartyaObject = updatedPost;
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
