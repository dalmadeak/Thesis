import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SajatBeszamolok } from './sajat-beszamolok.model';
import { filter, map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sajat-beszamolok',
  templateUrl: './sajat-beszamolok.component.html',
  styleUrls: ['./sajat-beszamolok.component.css','../sidenav.component.css']
})
export class SajatBeszamolokComponent implements OnInit {
  p : number = 1;

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  author: string = 'Test'

  private myReportsObject : SajatBeszamolok[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getPosts();
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
        this.myReportsObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
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
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }

}
