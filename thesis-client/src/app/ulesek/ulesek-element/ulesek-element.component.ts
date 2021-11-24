import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Ulesek } from '../ulesek.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";
import { UserService } from "src/app/bejelentkezes/user.service";

@Component({
  selector: 'app-ulesek-element',
  templateUrl: './ulesek-element.component.html',
  styleUrls: ['./ulesek-element.component.css']
})
export class UlesekElementComponent implements OnInit{
  @Input() filterData: any;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  selectedOption : string = 'ules';
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  isAuthenticated = false;

  p: number = 1;

  private ulesekObject : Ulesek[] = [];
  private userAuthSubs : Subscription | undefined;

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
    return [...this.ulesekObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/ulesek')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            author: post.author,
            committee: post.committee,
            type: post.type,
            title: post.title,
            content: post.content,
            decisionDate: post.decisionDate,
            date: post.date
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.ulesekObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/ulesek/' + postId)
      .subscribe(() => {
        const updatedPost = this.ulesekObject.filter(post => post._id !== postId);
        this.ulesekObject = updatedPost;
      })
  }

  getProperty(obj : Object, property : string){
    return(Object.values(obj).find((x) => {
      return x.name === property;
    })).title;
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
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
