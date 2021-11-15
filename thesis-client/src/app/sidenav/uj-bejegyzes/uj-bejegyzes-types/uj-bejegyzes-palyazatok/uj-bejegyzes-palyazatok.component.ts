import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Palyazatok } from '../../../../atlathatosag/atlathatosag-palyazatok/palyazatok.model';

@Component({
  selector: 'app-uj-bejegyzes-palyazatok',
  templateUrl: './uj-bejegyzes-palyazatok.component.html',
  styleUrls: ['./uj-bejegyzes-palyazatok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesPalyazatokComponent implements OnInit {
  @Output() selectedOptionEvent = new EventEmitter<string>();
  selectedOption : string = 'palyazat';

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Palyazatok = {
    _id : '',
    title: '',
    date: '',
    files: []
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private modalService: BsModalService) {
  }

 ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/palyazatok/' + this.postId)
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
    const newPost : Palyazatok = {
      _id: null,
      title: form.value.newRegistryGroup.title,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files,
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/palyazatok', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Palyazatok = {
      _id: id,
      title: form.value.newRegistryGroup.title,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/palyazatok/' + id, post)
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
