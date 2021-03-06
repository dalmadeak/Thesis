import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Felhasznalo } from 'src/app/bejelentkezes/user.model';

import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/register';

@Component({
  selector: 'app-admin-panel-regisztracio',
  templateUrl: './admin-panel-regisztracio.component.html',
  styleUrls: ['./admin-panel-regisztracio.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelRegisztracioComponent implements OnInit {
  modalRef: BsModalRef = new BsModalRef();
  editablePost : Felhasznalo = {
    _id : '',
    postType: '',
    identifier: '',
    fullName: '',
    password: '',
    position: '',
    email: '',
    permissions: '',
  };

  constructor(
    private http: HttpClient,
    private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    await this.addNewPost(form);
    form.reset();
    this.modalRef.hide();
  }

  addNewPost(form : NgForm) {
    const newPost : Felhasznalo = {
      _id: null,
      postType: 'auth',
      identifier: form.value.adminGroup.identifier,
      fullName: form.value.adminGroup.fullName,
      password: form.value.adminGroup.password,
      position: form.value.adminGroup.position,
      email: form.value.adminGroup.email,
      permissions: form.value.adminGroup.permissions,
    }

    return new Promise(resolve => {this.http.post<{ message: string, postId: string }>(BACKEND_URL, newPost)
      .subscribe((data) => {
        const id = data.postId;
        newPost._id = id;
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
