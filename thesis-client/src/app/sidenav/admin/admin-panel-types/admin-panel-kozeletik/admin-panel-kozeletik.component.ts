import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Kozeletik } from 'src/app/atlathatosag/atlathatosag-kozeletik/kozeletik.model';

@Component({
  selector: 'app-admin-panel-kozeletik',
  templateUrl: './admin-panel-kozeletik.component.html',
  styleUrls: ['./admin-panel-kozeletik.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelKozeletikComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  editablePost : Kozeletik = {
    _id : '',
    postType: '',
    name: '',
    amount: ''
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/kozeletik/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
        });
      } else {
        this.mode = 'createNewPost';
        this.postId = '';
      }
    });
  }

  onSubmit(form: NgForm) {
    if(this.mode === 'createNewPost') {
      this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form);
    }
    this.modalRef.hide();
    setTimeout(() => {this.router.navigate(['/atlathatosag/kozeletik']);},0);
  }

  addNewPost(form : NgForm) {
    const newPost : Kozeletik = {
      _id: null,
      postType: 'kozeletik',
      name: form.value.adminGroup.name,
      amount: form.value.adminGroup.amount,
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/kozeletik', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Kozeletik = {
      _id: id,
      postType: 'kozeletik',
      name: form.value.adminGroup.name,
      amount: form.value.adminGroup.amount,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/kozeletik/' + id, post)
      .subscribe((data) => {
      })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
