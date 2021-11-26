import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Sorompo } from '../../szolgaltatasok/szolgaltatasok-sorompo/sorompo.model';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt, faCheck, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sorompo-admin',
  templateUrl: './sorompo-admin.component.html',
  styleUrls: ['./sorompo-admin.component.css']
})
export class SorompoAdminComponent implements OnInit{
  faEdit = faPencilAlt;
  faDelete = faTrash;
  faComment = faComment;
  faCheck = faCheck;

  modalRef: BsModalRef = new BsModalRef();

  private sorompoObject : Sorompo[] = [];

  constructor(private http: HttpClient, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.sorompoObject].slice().reverse();
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/sorompo')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            fullName: post.fullName,
            neptun: post.neptun,
            plate: post.plate,
            type: post.type,
            email: post.email,
            phone: post.phone,
            card: post.card,
            date: post.date,
            semester: post.semester,
            reason: post.reason,
            isApproved: post.isApproved
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.sorompoObject = finalPosts;
      });
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/sorompo/' + postId)
      .subscribe(() => {
        const updatedPost = this.sorompoObject.filter(post => post._id !== postId);
        this.sorompoObject = updatedPost;
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
