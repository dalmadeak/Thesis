import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { Elnokseg } from "./elnokseg.model";

@Component({
  selector: 'app-szervezet-elnokseg',
  templateUrl: './szervezet-elnokseg.component.html',
  styleUrls: ['./szervezet-elnokseg.component.css']
})
export class SzervezetElnoksegComponent {
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private elnoksegObject : Elnokseg[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getPosts();
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
            image: post.image
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
