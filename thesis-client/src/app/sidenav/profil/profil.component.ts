import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Felhasznalo } from 'src/app/bejelentkezes/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/bejelentkezes/user.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  private postId : any;
  private userData: any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
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
    private modalService: BsModalService,
    private userService : UserService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.postId = this.userData.userId;
    this.http.get<{message: string, post: any }>('http://localhost:3000/api/auth/' + this.postId)
    .subscribe((fetchedData) => {
      this.editablePost = fetchedData.post[0];
    });
  }

  onSubmitProfile(form: NgForm) {
    this.updateProfile(this.postId, form);
    this.modalRef.hide();
  }

  onSubmitPassword(form: NgForm) {
    if (form.value.passwordGroup.newPassword == form.value.passwordGroup.newPasswordAgain &&
    form.value.passwordGroup.newPassword != form.value.passwordGroup.oldPassword) {
      this.updatePassword(this.postId, form);
    } else {
      console.log('failxd')
    }
    form.reset();
    this.modalRef.hide();

  }

  /*addNewPost(form : NgForm) {
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

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/auth/register', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }*/

 updateProfile(id: string, form: NgForm) {
    const post = {
      fullName: form.value.adminGroup.fullName,
      email: form.value.adminGroup.email,
    }
    this.http.patch<{ message: string }>('http://localhost:3000/api/auth/register/user/' + id, post)
      .subscribe()
  }

  updatePassword(id: string, form: NgForm) {
      const post = {
        userId: this.userData.userId,
        password: form.value.passwordGroup.newPassword,
      }
      console.log(this.userData.userId)
      this.http.patch<{ message: string }>('http://localhost:3000/api/auth/register/password/' + id, post)
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
