import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SajatBeszamolok } from './sajat-beszamolok.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { UserService } from "src/app/bejelentkezes/user.service";

@Component({
  selector: 'app-sajat-beszamolok',
  templateUrl: './sajat-beszamolok.component.html',
  styleUrls: ['./sajat-beszamolok.component.css','../sidenav.component.css']
})
export class SajatBeszamolokComponent implements OnInit, OnDestroy {
  p : number = 1;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;


  private myReportsObject : SajatBeszamolok[] = [];
  private userAuthSubs : Subscription | undefined;
  private user: any;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUserInformation();
    this.getPosts();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
 }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.myReportsObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{posts: any }>('http://localhost:3000/api/havi-beszamolok')
      .pipe(
        map(postData => {
        return postData.posts.map((post: any) => {
          return {
              _id: post._id,
              postType: post.postType,
              author: post.author,
              year: post.year,
              month: post.month,
              content: post.content,
              date: post.date
            }
          })
      }))
      .subscribe((finalPosts) => {
        this.myReportsObject = finalPosts.filter((data:any) => data.author.userId == this.user.userId);
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/havi-beszamolok/' + postId)
      .subscribe(() => {
        const updatedPost = this.myReportsObject.filter(post => post._id !== postId);
        this.myReportsObject = updatedPost;
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }

}
