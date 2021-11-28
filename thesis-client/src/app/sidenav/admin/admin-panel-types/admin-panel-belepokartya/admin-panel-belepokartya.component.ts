import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Belepokartya } from 'src/app/szolgaltatasok/szolgaltatasok-belepokartya/belepokartya.model';

import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/belepokartya';

@Component({
  selector: 'app-admin-panel-belepokartya',
  templateUrl: './admin-panel-belepokartya.component.html',
  styleUrls: ['./admin-panel-belepokartya.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelBelepokartyaComponent implements OnInit {

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();

  today = new Date();
  dateNow: string = '';
  timeNow: string = '';

  editablePost : Belepokartya = {
    _id: '',
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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router) {
  }

  ngOnInit() {
    this.editablePost.date = this.getDate();
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
    this.router.navigate(['/sidenav/belepokartya-admin']);
  }

  addNewPost(form : NgForm) {
    const newPost : Belepokartya = {
      _id: null,
      postType: 'belepokartya',
      fullName: form.value.adminGroup.fullName,
      neptun: form.value.adminGroup.neptun,
      email: form.value.adminGroup.email,
      studentId: form.value.adminGroup.studentId,
      card: form.value.adminGroup.card,
      permissions: form.value.adminGroup.permissions,
      date: form.value.adminGroup.date + ' ' + form.value.adminGroup.time,
      returnDate: form.value.adminGroup.returnDate + ' ' + form.value.adminGroup.returnTime,
      reason: form.value.adminGroup.reason,
      isApproved: form.value.adminGroup.isApproved
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
    const post : Belepokartya = {
      _id: id,
      postType: 'belepokartya',
      fullName: form.value.adminGroup.fullName,
      neptun: form.value.adminGroup.neptun,
      email: form.value.adminGroup.email,
      studentId: form.value.adminGroup.studentId,
      card: form.value.adminGroup.card,
      permissions: form.value.adminGroup.permissions,
      date: form.value.adminGroup.date + ' ' + form.value.adminGroup.time,
      returnDate: form.value.adminGroup.returnDate + ' ' + form.value.adminGroup.returnTime,
      reason: form.value.adminGroup.reason,
      isApproved: form.value.adminGroup.isApproved
    }

    return new Promise(resolve => {this.http.put<{ message: string }>(BACKEND_URL + '/' + id, post)
      .subscribe((data) => {
        resolve(data);
      })
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
    this.modalRef.hide();
  }

}
