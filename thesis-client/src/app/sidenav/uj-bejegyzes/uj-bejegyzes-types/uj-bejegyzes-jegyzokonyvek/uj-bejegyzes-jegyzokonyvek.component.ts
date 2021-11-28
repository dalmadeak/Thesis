import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Jegyzokonyvek } from '../../../../atlathatosag/atlathatosag-jegyzokonyvek/jegyzokonyvek.model';
import { mimeType } from '../mime-type.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/jegyzokonyvek';

@Component({
  selector: 'app-uj-bejegyzes-jegyzokonyvek',
  templateUrl: './uj-bejegyzes-jegyzokonyvek.component.html',
  styleUrls: ['./uj-bejegyzes-jegyzokonyvek.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesJegyzokonyvekComponent implements OnInit {
  form: any;

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  isFileUploaded: boolean = false;

  today = new Date();
  dateNow: string = ''
  timeNow: string = ''

  editablePost : Jegyzokonyvek = {
    _id : '',
    postType: '',
    committee: '',
    title: '',
    decisionDate: '',
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
      'committee': new FormControl(null, {validators: [Validators.required]}),
      'title': new FormControl(null, {validators: [Validators.required]}),
      'decisionDate': new FormControl(null, {validators: [Validators.required]}),
      'decisionTime': new FormControl(null, {validators: [Validators.required]}),
      'date': new FormControl(this.dateNow, {validators: [Validators.required]}),
      'time': new FormControl(this.timeNow, {validators: [Validators.required]}),
      'file': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>(BACKEND_URL + '/' + this.postId)
        .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
          this.form.setValue(
            {
              'committee': this.editablePost.committee,
              'title': this.editablePost.title,
              'decisionDate': this.editablePost.decisionDate.split(' ')[0],
              'decisionTime': this.editablePost.decisionDate.split(' ')[1],
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
    this.router.navigate(['/atlathatosag/jegyzokonyvek']);
  }

  addNewPost() {
    const postData = new FormData();
    postData.append('_id', '');
    postData.append('postType', 'jegyzokonyvek');
    postData.append('committee', this.form.value.committee);
    postData.append('title', this.form.value.title);
    postData.append('decisionDate', this.form.value.decisionDate + ' ' + this.form.value.decisionTime);
    postData.append('date', this.form.value.date + ' ' + this.form.value.time);
    postData.append('file', this.form.value.file, this.form.value.title);

    return new Promise(resolve => {this.http.post<{ message: string, post: Jegyzokonyvek }>(BACKEND_URL, postData)
      .subscribe((data) => {
        resolve(data);
      })
    });
  }

  updatePost(id: string, file: File | string) {
    let postData : Jegyzokonyvek | FormData;
    if(typeof(file) === "object") {
      postData = new FormData();
      postData.append('_id', id);
      postData.append('postType', 'jegyzokonyvek');
      postData.append('committee', this.form.value.committee);
      postData.append('title', this.form.value.title);
      postData.append('decisionDate', this.form.value.decisionDate + ' ' + this.form.value.decisionTime);
      postData.append('date', this.form.value.date + ' ' + this.form.value.time);
      postData.append('file', file, this.form.value.title);
    } else {
      postData = {
        _id: id,
        postType: 'jegyzokonyvek',
        committee: this.form.value.committee,
        title: this.form.value.title,
        decisionDate: this.form.value.decisionDate + ' ' + this.form.value.decisionTime,
        date: this.form.value.date + ' ' + this.form.value.time,
        file: this.form.value.file,
      }
    }

    return new Promise(resolve => {this.http.put<{ message: string }>(BACKEND_URL + '/' + id, postData)
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
