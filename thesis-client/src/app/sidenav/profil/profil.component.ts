import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Felhasznalo } from 'src/app/bejelentkezes/user.model';
import { UserService } from 'src/app/bejelentkezes/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  private postId : any;
  private userData: any;
  private authLevel: number = 5;

  modalRef: BsModalRef = new BsModalRef();
  isValidPassword = true;
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
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
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

  onSubmitPassword(form: NgForm, template: TemplateRef<any>) {
    if (form.value.passwordGroup.newPassword == form.value.passwordGroup.newPasswordAgain &&
    form.value.passwordGroup.newPassword != form.value.passwordGroup.oldPassword) {
      this.updatePassword(this.postId, form, template);
    } else {
      this.isValidPassword = false;
    }
    form.reset();
    this.modalRef.hide();
  }

  getAuthLevel() {
    return this.authLevel;
  }

  getUserService() {
    return this.userService;
  }

  updateProfile(id: string, form: NgForm) {
    const post = {
      fullName: form.value.adminGroup.fullName,
      email: form.value.adminGroup.email,
    }
    this.http.patch<{ message: string }>('http://localhost:3000/api/auth/register/user/' + id, post)
      .subscribe()
  }

  updatePassword(id: string, form: NgForm, template: TemplateRef<any>) {
      const post = {
        userId: this.userData.userId,
        password: form.value.passwordGroup.newPassword,
        oldPass: form.value.passwordGroup.oldPassword,
      }
      this.http.patch<{ message: string }>('http://localhost:3000/api/auth/register/password/' + id, post)
        .subscribe(message => {
          if (message.message == 'User updated successfully') {
            this.openModal(template);
          }
        })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }

}
