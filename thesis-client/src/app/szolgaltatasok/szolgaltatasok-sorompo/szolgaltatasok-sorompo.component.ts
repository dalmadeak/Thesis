import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Sorompo } from './sorompo.model';

@Component({
  selector: 'app-szolgaltatasok-sorompo',
  templateUrl: './szolgaltatasok-sorompo.component.html',
  styleUrls: ['./szolgaltatasok-sorompo.component.css', '../szolgaltatasok.component.css']
})
export class SzolgaltatasokSorompoComponent {
  @Output() selectedOptionEvent = new EventEmitter<string>();
  selectedOption : string = 'sorompo';

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Sorompo = {
    _id : '',
    postType: '',
    fullName: '',
    neptun: '',
    plate: '',
    type: '',
    email: '',
    phone: '',
    card: '',
    date: '',
    semester: '',
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/sorompo/' + this.postId)
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
    let cardNumber = (form.value.barrierRegistryGroup.card == '') ? '-' : form.value.barrierRegistryGroup.card;
    const newPost : Sorompo = {
      _id: null,
      postType: 'sorompo',
      fullName: form.value.barrierRegistryGroup.fullName,
      neptun: form.value.barrierRegistryGroup.neptun,
      plate: form.value.barrierRegistryGroup.plate,
      type: form.value.barrierRegistryGroup.type,
      email: form.value.barrierRegistryGroup.email,
      phone: form.value.barrierRegistryGroup.phone,
      card: cardNumber,
      date: today.getFullYear() + '-' + (today.getMonth()+1) + '-'+ today.getDate() + ' ' + today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes(),
      semester: '-',
      reason: form.value.barrierRegistryGroup.reason,
      isApproved: false
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/sorompo', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
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
