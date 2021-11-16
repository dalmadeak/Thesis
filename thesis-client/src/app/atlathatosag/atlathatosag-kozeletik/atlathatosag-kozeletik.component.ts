import { HttpClient } from "@angular/common/http";
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { Kozeletik } from "./kozeletik.model";

@Component({
  selector: 'app-atlathatosag-kozeletik',
  templateUrl: './atlathatosag-kozeletik.component.html',
  styleUrls: ['./atlathatosag-kozeletik.component.css']
})
export class AtlathatosagKozeletikComponent implements OnInit{
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private kozeletikObject : Kozeletik[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.kozeletikObject];
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/kozeletik')
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
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/kozeletik/' + postId)
      .subscribe(() => {
        const updatedPost = this.kozeletikObject.filter(post => post._id !== postId);
        this.kozeletikObject = updatedPost;
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
