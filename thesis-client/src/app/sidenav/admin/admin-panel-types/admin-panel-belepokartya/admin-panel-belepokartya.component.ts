import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Belepokartya } from 'src/app/szolgaltatasok/szolgaltatasok-belepokartya/belepokartya.model';

@Component({
  selector: 'app-admin-panel-belepokartya',
  templateUrl: './admin-panel-belepokartya.component.html',
  styleUrls: ['./admin-panel-belepokartya.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelBelepokartyaComponent implements OnInit {

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
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
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/belepokartya/' + this.postId)
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
    setTimeout(() => {this.router.navigate(['/szolgaltatasok/belepokartya']);},0);
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

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/belepokartya', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
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
    this.http.put<{ message: string }>('http://localhost:3000/api/belepokartya/' + id, post)
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
