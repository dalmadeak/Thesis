import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Kuldottgyules } from 'src/app/szervezet/szervezet-kgy/kuldottgyules.model';
import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/kuldottgyules';

@Component({
  selector: 'app-admin-panel-kuldottgyules',
  templateUrl: './admin-panel-kuldottgyules.component.html',
  styleUrls: ['./admin-panel-kuldottgyules.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelKuldottgyulesComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  editablePost : Kuldottgyules = {
    _id : '',
    postType: '',
    fullName: '',
    firstCommittee: '',
    firstPosition: '',
    secondCommittee: '',
    secondPosition: '',
    email: ''
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router) {
  }

 ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>(BACKEND_URL + '/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
        });
      } else {
        this.mode = 'createNewPost';
        this.postId = '';
      }
    });
  }

  async onSubmit(form: NgForm) {
    if(this.mode === 'createNewPost') {
      await this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      await this.updatePost(this.postId, form);
    }

    this.modalRef.hide();
    this.router.navigate(['/szervezet/kgy']);
  }

  addNewPost(form : NgForm) {
    const newPost : Kuldottgyules = {
      _id: null,
      postType: 'kuldottgyules',
      fullName: form.value.adminGroup.fullName,
      firstCommittee: form.value.adminGroup.firstCommittee,
      firstPosition: form.value.adminGroup.firstPosition,
      secondCommittee: form.value.adminGroup.secondCommittee,
      secondPosition: form.value.adminGroup.secondPosition,
      email: form.value.adminGroup.email
    }

     return new Promise(resolve => {this.http.post<{ message: string, postId: string }>(BACKEND_URL, newPost)
      .subscribe((data) => {
        const id = data.postId;
        newPost._id = id;
        resolve(data);
      })
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Kuldottgyules = {
      _id: id,
      postType: 'kuldottgyules',
      fullName: form.value.adminGroup.fullName,
      firstCommittee: form.value.adminGroup.firstCommittee,
      firstPosition: form.value.adminGroup.firstPosition,
      secondCommittee: form.value.adminGroup.secondCommittee,
      secondPosition: form.value.adminGroup.secondPosition,
      email: form.value.adminGroup.email
    }

    return new Promise(resolve => {this.http.put<{ message: string }>(BACKEND_URL + '/' + id, post)
      .subscribe((data) => {
        resolve(data);
      })
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
