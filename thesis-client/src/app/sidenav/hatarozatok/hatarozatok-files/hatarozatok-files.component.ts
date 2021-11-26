import { HttpClient } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import { map } from "rxjs/operators";
import { Hatarozatok } from "../hatarozatok.model";
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-hatarozatok-files',
  templateUrl: './hatarozatok-files.component.html',
  styleUrls: ['./hatarozatok-files.component.css','../../sidenav.component.css']
})
export class HatarozatokFilesComponent implements OnInit, OnDestroy{
  @Input() filterData: any;
  p : number = 1;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;

  private hatarozatokObject : Hatarozatok[] = [];
  private userAuthSubs : Subscription | undefined;
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService) {
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
    return [...this.hatarozatokObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/hatarozatok')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            committee: post.committee,
            title: post.title,
            number: post.number,
            decisionDate: post.decisionDate,
            content: post.content,
            mandate: post.mandate,
            vote: post.vote,
            date: post.date,
            file: post.file,
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.hatarozatokObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/hatarozatok/' + postId)
      .subscribe(() => {
        const updatedPost = this.hatarozatokObject.filter(post => post._id !== postId);
        this.hatarozatokObject = updatedPost;
      })
  }

  getAuthLevel() {
    return this.authLevel;
  }

  filterObject(data : Array<any>) {
    let copyOfObject = data.slice().reverse();
    if (this.filterData !== null && this.filterData !== '') {
      copyOfObject = copyOfObject.filter(el => el.committee == this.filterData.id)
    }
    return copyOfObject;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }

}
