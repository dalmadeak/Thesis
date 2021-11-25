import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Belepokartya } from './belepokartya.model';

@Component({
  selector: 'app-szolgaltatasok-belepokartya',
  templateUrl: './szolgaltatasok-belepokartya.component.html',
  styleUrls: ['./szolgaltatasok-belepokartya.component.css']
})
export class SzolgaltatasokBelepokartyaComponent {
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Belepokartya = {
    _id : '',
    postType: '',
    fullName: '',
    neptun: '',
    email: '',
    studentId: '',
    card: '',
    permissions: '',
    date: '',
    returnDate: '',
    reason: '',
    isApproved: false
  };

  today = new Date();
  dateNow: string = ''
  timeNow: string = ''

  constructor(
    private http: HttpClient,
    private modalService: BsModalService) {
  }

 ngOnInit() {

  }

  onSubmit(form: NgForm, template: TemplateRef<any>) {
    this.message = 'Elfogadva';
    this.addNewPost(form, template);
    form.reset();
    this.modalRef.hide();
  }

  addNewPost(form : NgForm, template: TemplateRef<any>) {
    let today = new Date();
    const newPost : Belepokartya = {
      _id: null,
      postType: 'belepokartya',
      fullName: form.value.cardRegistryGroup.fullName,
      neptun: form.value.cardRegistryGroup.neptun,
      email: form.value.cardRegistryGroup.email,
      studentId: form.value.cardRegistryGroup.studentId,
      card: '-',
      permissions: '-',
      date: this.getDate(),
      returnDate: '-',
      reason: form.value.cardRegistryGroup.reason,
      isApproved: false
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/belepokartya', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
      this.openModal(template);
    });
  }

  getDate(){
    let today = new Date();
    this.dateNow =
      today.getFullYear() + '-' +
      (((today.getMonth()+1) < 10) ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1)) + '-' +
      ((today.getDate()< 10) ? ('0' + today.getDate()) : (today.getDate()));
    this.timeNow =
      ((today.getHours() < 10) ? ('0' + today.getHours() + ':') : (today.getHours()  + ':')) +
      ((today.getMinutes() < 10) ? ('0' + today.getMinutes()) : (today.getMinutes()))

    return this.dateNow + ' ' + this.timeNow;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
