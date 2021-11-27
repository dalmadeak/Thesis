import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Palyazatok } from '../../../../atlathatosag/atlathatosag-palyazatok/palyazatok.model';
import { mimeType } from '../mime-type.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uj-bejegyzes-palyazatok',
  templateUrl: './uj-bejegyzes-palyazatok.component.html',
  styleUrls: ['./uj-bejegyzes-palyazatok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesPalyazatokComponent implements OnInit {
  form: any;

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  isFileUploaded: boolean = false;

  today = new Date();
  dateNow: string = ''
  timeNow: string = ''

  editablePost : Palyazatok = {
    _id : '',
    postType: '',
    title: '',
    date: '',
    file: ''
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router) {
  }

 ngOnInit() {
  this.getDate();
  this.form = new FormGroup({
    'title': new FormControl(null, {validators: [Validators.required]}),
    'date': new FormControl(this.dateNow, {validators: [Validators.required]}),
    'time': new FormControl(this.timeNow, {validators: [Validators.required]}),
    'file': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
  });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/palyazatok/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
          this.form.setValue(
            {
              'title': this.editablePost.title,
              'date': this.editablePost.date.split(' ')[0],
              'time': this.editablePost.date.split(' ')[1],
              'file': this.editablePost.file,
            });
        });
      } else {
        this.mode = 'createNewPost';
        this.postId = '';
      }
    });
  }

  async onSubmit() {
    if(this.mode === 'createNewPost') {
      await this.addNewPost();
    } else if (this.mode === 'editPost') {
      await this.updatePost(this.postId, this.form.value.file);
    }
    this.form.reset();
    this.modalRef.hide();
    this.router.navigate(['/atlathatosag/palyazatok']);
  }

  addNewPost() {
    const postData = new FormData();
    postData.append('_id', '');
    postData.append('postType', 'palyazatok');
    postData.append('title', this.form.value.title);
    postData.append('date', this.form.value.date + ' ' + this.form.value.time);
    postData.append('file', this.form.value.file, this.form.value.title);

    return new Promise(resolve => {this.http.post<{ message: string, post: Palyazatok }>('http://localhost:3000/api/palyazatok', postData)
    .subscribe((data) => {
        resolve(data);
      })
    });
  }

  updatePost(id: string, file: File | string) {
    let postData : Palyazatok | FormData;
    if(typeof(file) === "object") {
      postData = new FormData();
      postData.append('_id', id);
      postData.append('postType', 'palyazatok');
      postData.append('title', this.form.value.title);
      postData.append('date', this.form.value.date + ' ' + this.form.value.time);
      postData.append('file', file, this.form.value.title);
    } else {
      postData = {
        _id: id,
        postType: 'palyazatok',
        title: this.form.value.title,
        date: this.form.value.date + ' ' + this.form.value.time,
        file: this.form.value.file,
      }
    }
    return new Promise(resolve => {this.http.put<{ message: string }>('http://localhost:3000/api/palyazatok/' + id, postData)
      .subscribe((data) => {
        resolve(data);
      })
    });
  }

  onFilePicked(event: Event) {
    if(!(event.target as HTMLInputElement).files![0]) {
      return;
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();

    const reader = new FileReader();
    this.isFileUploaded = true;
    reader.readAsDataURL(file);
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
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
