import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { Kabinet } from "./kabinet.model";
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-szervezet-kabinet',
  templateUrl: './szervezet-kabinet.component.html',
  styleUrls: ['./szervezet-kabinet.component.css']
})
export class SzervezetKabinetComponent {
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private kabinetObject : Kabinet[] = [];

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
    return [...this.kabinetObject];
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/kabinet')
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
        this.kabinetObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/kabinet/' + postId)
      .subscribe(() => {
        const updatedPost = this.kabinetObject.filter(post => post._id !== postId);
        this.kabinetObject = updatedPost;
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
