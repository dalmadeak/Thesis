import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Hirek } from '../hirek.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-hirek-element',
  templateUrl: './hirek-element.component.html',
  styleUrls: ['./hirek-element.component.css']
})
export class HirekElementComponent implements OnInit, OnDestroy{
  faEdit = faPencilAlt;
  faDelete = faTrash;

  p: number = 1;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private hirekObject : Hirek[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService) {
  }

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
    return [...this.hirekObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/hirek')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            title: post.title,
            content: post.content,
            date: post.date
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.hirekObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/hirek/' + postId)
      .subscribe(() => {
        const updatedPost = this.hirekObject.filter(post => post._id !== postId);
        this.hirekObject = updatedPost;
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
