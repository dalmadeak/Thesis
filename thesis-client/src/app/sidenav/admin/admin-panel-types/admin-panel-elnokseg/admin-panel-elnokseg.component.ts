import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Elnokseg } from 'src/app/szervezet/szervezet-elnokseg/elnokseg.model';

@Component({
  selector: 'app-admin-panel-elnokseg',
  templateUrl: './admin-panel-elnokseg.component.html',
  styleUrls: ['./admin-panel-elnokseg.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelElnoksegComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Elnokseg = {
    _id : '',
    postType: '',
    name: '',
    position: '',
    email: '',
    image: ''
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/elnokseg/' + this.postId)
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
    this.message = 'Elfogadva';
    if(this.mode === 'createNewPost') {
      this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form);
    }
    this.modalRef.hide();
    setTimeout(() => {this.router.navigate(['/szervezet/elnokseg']);},0);
  }

  addNewPost(form : NgForm) {
    const newPost : Elnokseg = {
      _id: null,
      postType: 'elnokseg',
      name: form.value.adminGroup.name,
      position: form.value.adminGroup.position,
      email: form.value.adminGroup.email,
      image: form.value.adminGroup.image,
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/elnokseg', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Elnokseg = {
      _id: id,
      postType: 'elnokseg',
      name: form.value.adminGroup.name,
      position: form.value.adminGroup.position,
      email: form.value.adminGroup.email,
      image: form.value.adminGroup.image,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/elnokseg/' + id, post)
      .subscribe((data) => {
        console.log(data);
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
