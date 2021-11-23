import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Felhasznalo } from 'src/app/bejelentkezes/user.model';

@Component({
  selector: 'app-admin-panel-regisztracio',
  templateUrl: './admin-panel-regisztracio.component.html',
  styleUrls: ['./admin-panel-regisztracio.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelRegisztracioComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Felhasznalo = {
    _id : '',
    postType: '',
    identifier: '',
    password: '',
    position: '',
    email: '',
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/auth/' + this.postId)
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
    form.reset();
    this.modalRef.hide();
  }

  addNewPost(form : NgForm) {
    const newPost : Felhasznalo = {
      _id: null,
      postType: 'auth',
      identifier: form.value.adminGroup.identifier,
      password: form.value.adminGroup.password,
      position: form.value.adminGroup.position,
      email: form.value.adminGroup.email,
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/auth', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Felhasznalo = {
      _id: id,
      postType: 'auth',
      identifier: form.value.adminGroup.identifier,
      password: form.value.adminGroup.password,
      position: form.value.adminGroup.position,
      email: form.value.adminGroup.email,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/auth/' + id, post)
      .subscribe()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }

}
