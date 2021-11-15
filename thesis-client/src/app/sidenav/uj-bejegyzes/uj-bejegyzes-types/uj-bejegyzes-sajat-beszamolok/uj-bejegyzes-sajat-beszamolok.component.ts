import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SajatBeszamolok } from '../../../sajat-beszamolok/sajat-beszamolok.model';

@Component({
  selector: 'app-uj-bejegyzes-sajat-beszamolok',
  templateUrl: './uj-bejegyzes-sajat-beszamolok.component.html',
  styleUrls: ['./uj-bejegyzes-sajat-beszamolok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesSajatBeszamolokComponent implements OnInit {
  @Output() selectedOptionEvent = new EventEmitter<string>();

  selectedOption : string = 'b-beszamolo';
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private mode = 'createNewPost'
  private postId : any;
  editablePost : SajatBeszamolok = {
    _id : '',
    author: '',
    year: 0,
    month: '',
    content: '',
    date: '',
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private modalService: BsModalService) {
  }

 ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/havi-beszamolok/' + this.postId)
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
  }

  addNewPost(form : NgForm) {
    const newPost : SajatBeszamolok = {
      _id: null,
      author: 'Test',
      year: form.value.newRegistryGroup.year,
      month: form.value.newRegistryGroup.month,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/havi-beszamolok', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : SajatBeszamolok = {
      _id: id,
      author: 'Test',
      year: form.value.newRegistryGroup.year,
      month: form.value.newRegistryGroup.month,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/havi-beszamolok/' + id, post)
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

  emitSelectedOption(value: string) {
    this.selectedOptionEvent.emit(value);
    console.log(value)
  }

}
