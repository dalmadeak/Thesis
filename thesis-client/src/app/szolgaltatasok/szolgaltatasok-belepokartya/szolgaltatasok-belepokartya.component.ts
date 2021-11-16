import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Belepokartya } from './belepokartya.model';

@Component({
  selector: 'app-szolgaltatasok-belepokartya',
  templateUrl: './szolgaltatasok-belepokartya.component.html',
  styleUrls: ['./szolgaltatasok-belepokartya.component.css']
})
export class SzolgaltatasokBelepokartyaComponent {
  @Output() selectedOptionEvent = new EventEmitter<string>();
  selectedOption : string = 'belepokartya';

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Belepokartya = {
    _id : '',
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
    private modalService: BsModalService) {
  }

 ngOnInit() {
    /*this.route.paramMap.subscribe((paramMap: ParamMap) => {
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
    });*/
  }

  onSubmit(form: NgForm) {
    this.message = 'Elfogadva';
    this.addNewPost(form);
    /*if(this.mode === 'createNewPost') {
      this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form);
    }*/
    this.modalRef.hide();
  }

  addNewPost(form : NgForm) {
    let today = new Date();
    const newPost : Belepokartya = {
      _id: null,
      fullName: form.value.cardRegistryGroup.fullName,
      neptun: form.value.cardRegistryGroup.neptun,
      email: form.value.cardRegistryGroup.email,
      studentId: form.value.cardRegistryGroup.studentId,
      card: '-',
      permissions: '-',
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
      returnDate: '-',
      reason: form.value.cardRegistryGroup.reason,
      isApproved: false
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/belepokartya', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });

    form.reset();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }

  emitSelectedOption(value: string) {
    this.selectedOptionEvent.emit(value);
    console.log(value)
  }
}
