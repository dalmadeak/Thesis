import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Sorompo } from 'src/app/szolgaltatasok/szolgaltatasok-sorompo/sorompo.model';

import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/sorompo';

@Component({
  selector: 'app-admin-panel-sorompo',
  templateUrl: './admin-panel-sorompo.component.html',
  styleUrls: ['./admin-panel-sorompo.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelSorompoComponent implements OnInit {

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();

  today = new Date();
  dateNow: string = '';
  timeNow: string = '';

  editablePost : Sorompo = {
    _id: '',
    postType: '',
    fullName: '',
    neptun: '',
    email: '',
    phone: '',
    card: '',
    plate: '',
    type: '',
    date: '',
    semester: '',
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
    this.router.navigate(['/szolgaltatasok/sorompo']);
  }

  addNewPost(form : NgForm) {
    const newPost : Sorompo = {
      _id: null,
      postType: 'sorompo',
      fullName: form.value.adminGroup.fullName,
      neptun: form.value.adminGroup.neptun,
      email: form.value.adminGroup.email,
      phone: form.value.adminGroup.phone,
      card: form.value.adminGroup.card,
      plate: form.value.adminGroup.plate,
      type: form.value.adminGroup.type,
      date: form.value.adminGroup.date + ' ' + form.value.adminGroup.time,
      semester: form.value.adminGroup.semester,
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
    const post : Sorompo = {
      _id: id,
      postType: 'sorompo',
      fullName: form.value.adminGroup.fullName,
      neptun: form.value.adminGroup.neptun,
      email: form.value.adminGroup.email,
      phone: form.value.adminGroup.phone,
      card: form.value.adminGroup.card,
      plate: form.value.adminGroup.plate,
      type: form.value.adminGroup.type,
      date: form.value.adminGroup.date + ' ' + form.value.adminGroup.time,
      semester: form.value.adminGroup.semester,
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
