import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Iroda } from 'src/app/szolgaltatasok/szolgaltatasok-nyitvatartas/iroda.model';

@Component({
  selector: 'app-admin-panel-iroda',
  templateUrl: './admin-panel-iroda.component.html',
  styleUrls: ['./admin-panel-iroda.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelIrodaComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  editablePost : Iroda = {
    _id : '',
    postType: '',
    name: '',
    brief: '',
    openHours: ''
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/iroda/' + this.postId)
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
    setTimeout(() => {this.router.navigate(['/szolgaltatasok/iroda']);},0);
  }

  addNewPost(form : NgForm) {
    const newPost : Iroda = {
      _id: null,
      postType: 'iroda',
      name: form.value.adminGroup.name,
      brief: form.value.adminGroup.brief,
      openHours: form.value.adminGroup.openHours,
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/iroda', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Iroda = {
      _id: id,
      postType: 'iroda',
      name: form.value.adminGroup.name,
      brief: form.value.adminGroup.brief,
      openHours: form.value.adminGroup.openHours,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/iroda/' + id, post)
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
