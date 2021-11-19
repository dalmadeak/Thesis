import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Beszamolok } from '../../../../atlathatosag/atlathatosag-beszamolok/beszamolok.model';
import { mimeType } from '../mime-type.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uj-bejegyzes-beszamolok',
  templateUrl: './uj-bejegyzes-beszamolok.component.html',
  styleUrls: ['./uj-bejegyzes-beszamolok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesBeszamolokComponent implements OnInit {
  form: any;
  imagePreview: string = '';

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  today = new Date();
  dateNow = this.today.getFullYear() + '-' + (this.today.getMonth()+1) + '-' + this.today.getDate();
  timeNow = this.today.getHours() + ':' + this.today.getMinutes();

  editablePost : Beszamolok = {
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/beszamolok/' + this.postId)
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

  onSubmit() {
    this.message = 'Elfogadva';
    if(this.mode === 'createNewPost') {
      this.addNewPost();
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, this.form.value.file);
    }
    this.form.reset();
    this.modalRef.hide();
    setTimeout(() => {this.router.navigate(['/atlathatosag/beszamolok']);},0);
  }

  addNewPost() {
    const postData = new FormData();
    postData.append('_id', '');
    postData.append('postType', 'beszamolok');
    postData.append('title', this.form.value.title);
    postData.append('date', this.form.value.date + ' ' + this.form.value.time);
    postData.append('file', this.form.value.file, this.form.value.title);

    this.http.post<{ message: string, post: Beszamolok }>('http://localhost:3000/api/beszamolok', postData)
      .subscribe((data) => {
        const newPost : Beszamolok = {
          _id: data.post._id,
          postType: 'beszamolok',
          title: this.form.value.title,
          date: this.form.value.date + ' ' + this.form.value.time,
          file: data.post.file
        }
    });
  }

  updatePost(id: string, file: File | string) {
    let postData : Beszamolok | FormData;
    if(typeof(file) === "object") {
      postData = new FormData();
      postData.append('_id', id);
      postData.append('postType', 'beszamolok');
      postData.append('title', this.form.value.title);
      postData.append('date', this.form.value.date + ' ' + this.form.value.time);
      postData.append('file', file,this.form.value.title);
    } else {
      postData = {
        _id: id,
        postType: 'beszamolok',
        title: this.form.value.title,
        date: this.form.value.date + ' ' + this.form.value.time,
        file: this.form.value.file,
      }
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/beszamolok/' + id, postData)
      .subscribe((data) => {
        const newPost = {
          _id: id,
          postType: 'beszamolok',
          title: this.form.value.title,
          date: this.form.value.date + ' ' + this.form.value.time,
          file: ''
        }
      })
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();

    //convert do data url
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
