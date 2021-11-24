import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Hatarozatok } from 'src/app/sidenav/hatarozatok/hatarozatok.model';
import { mimeType } from '../mime-type.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uj-bejegyzes-hatarozatok',
  templateUrl: './uj-bejegyzes-hatarozatok.component.html',
  styleUrls: ['./uj-bejegyzes-hatarozatok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesHatarozatokComponent implements OnInit {
  form: any;
  imagePreview: string = '';

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  today = new Date();
  dateNow: string = ''
  timeNow: string = ''

  editablePost : Hatarozatok = {
    _id: '',
    postType: '',
    committee: '',
    title: '',
    number: '',
    decisionDate: '',
    content: '',
    mandate: 0,
    vote: '',
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
    'number': new FormControl(null, {validators: [Validators.required]}),
    'decisionDate': new FormControl(null, {validators: [Validators.required]}),
    'decisionTime': new FormControl(null, {validators: [Validators.required]}),
    'content': new FormControl(null, {validators: [Validators.required]}),
    'mandate': new FormControl(null, {validators: [Validators.required]}),
    'vote': new FormControl(null, {validators: [Validators.required]}),
    'date': new FormControl(this.dateNow, {validators: [Validators.required]}),
    'time': new FormControl(this.timeNow, {validators: [Validators.required]}),
    'file': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
  });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/hatarozatok/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
          this.form.setValue(
            {
              'committee': this.editablePost.committee,
              'title': this.editablePost.title,
              'number': this.editablePost.number,
              'decisionDate': this.editablePost.decisionDate.split(' ')[0],
              'decisionTime': this.editablePost.decisionDate.split(' ')[1],
              'content': this.editablePost.content,
              'mandate': this.editablePost.mandate,
              'vote': this.editablePost.vote,
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
    setTimeout(() => {this.router.navigate(['/sidenav/hatarozatok']);},0);
  }

  addNewPost() {
    const postData = new FormData();
    postData.append('_id', '');
    postData.append('postType', 'hatarozatok');
    postData.append('committee', this.form.value.committee);
    postData.append('title', this.form.value.title);
    postData.append('number', this.form.value.number);
    postData.append('decisionDate', this.form.value.decisionDate + ' ' + this.form.value.decisionTime);
    postData.append('content', this.form.value.content);
    postData.append('mandate', this.form.value.mandate);
    postData.append('vote', this.form.value.vote);
    postData.append('date', this.form.value.date + ' ' + this.form.value.time);
    postData.append('file', this.form.value.file, this.form.value.title);

    this.http.post<{ message: string, post: Hatarozatok }>('http://localhost:3000/api/hatarozatok', postData)
      .subscribe((data) => {
        const newPost: Hatarozatok = {
          _id: data.post._id,
          postType: 'hatarozatok',
          committee: this.form.value.committee,
          title: this.form.value.title,
          number: this.form.value.number,
          decisionDate: this.form.value.decisionDate + ' ' + this.form.value.decisionTime,
          content: this.form.value.content,
          mandate: this.form.value.mandate,
          vote: this.form.value.vote,
          date: this.form.value.date + ' ' + this.form.value.time,
          file: data.post.file,
        }
    });
  }

  updatePost(id: string, file: File | string) {
    let postData : Hatarozatok | FormData;
    if(typeof(file) === "object") {
      postData = new FormData();
      postData.append('_id', id);
      postData.append('postType', 'hatarozatok');
      postData.append('committee', this.form.value.committee);
      postData.append('title', this.form.value.title);
      postData.append('number', this.form.value.number);
      postData.append('decisionDate', this.form.value.decisionDate + ' ' + this.form.value.decisionTime);
      postData.append('content', this.form.value.content);
      postData.append('mandate', this.form.value.mandate);
      postData.append('vote', this.form.value.vote);
      postData.append('date', this.form.value.date + ' ' + this.form.value.time);
      postData.append('file', file, this.form.value.title);
    } else {
      postData = {
        _id: id,
        postType: 'hatarozatok',
        committee: this.form.value.committee,
        title: this.form.value.title,
        number: this.form.value.number,
        decisionDate: this.form.value.decisionDate + ' ' + this.form.value.decisionTime,
        content: this.form.value.content,
        mandate: this.form.value.mandate,
        vote: this.form.value.vote,
        date: this.form.value.date + ' ' + this.form.value.time,
        file: this.form.value.file,
      }
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/hatarozatok/' + id, postData)
      .subscribe((data) => {
        const newPost = {
          _id: id,
          postType: 'hatarozatok',
          committee: this.form.value.committee,
          title: this.form.value.title,
          number: this.form.value.number,
          decisionDate: this.form.value.decisionDate + ' ' + this.form.value.decisionTime,
          content: this.form.value.content,
          mandate: this.form.value.mandate,
          vote: this.form.value.vote,
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
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
