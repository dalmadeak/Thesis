import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { Elnokseg } from "./elnokseg.model";
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-szervezet-elnokseg',
  templateUrl: './szervezet-elnokseg.component.html',
  styleUrls: ['./szervezet-elnokseg.component.css']
})
export class SzervezetElnoksegComponent implements OnInit {
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private elnoksegObject : Elnokseg[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService) {}

  isAuthenticated = false;
  private userAuthSubs : Subscription | undefined;
  ngOnInit() {
    this.getPosts();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this. userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.elnoksegObject];
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/elnokseg')
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
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/elnokseg/' + postId)
      .subscribe(() => {
        const updatedPost = this.elnoksegObject.filter(post => post._id !== postId);
        this.elnoksegObject = updatedPost;
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
