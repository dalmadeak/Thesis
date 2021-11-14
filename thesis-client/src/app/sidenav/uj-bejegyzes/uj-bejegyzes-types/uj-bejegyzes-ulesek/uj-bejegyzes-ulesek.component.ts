import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Ulesek } from '../../../../ulesek/ulesek.model';

@Component({
  selector: 'app-uj-bejegyzes-ulesek',
  templateUrl: './uj-bejegyzes-ulesek.component.html',
  styleUrls: ['./uj-bejegyzes-ulesek.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesUlesekComponent implements OnInit {
  @Output() selectedOptionEvent = new EventEmitter<string>();
  selectedOption : string = 'ules';

  private mode = 'createNewPost'
  private postId : any;
  editablePost : Ulesek = {
    _id : '',
    author: '',
    committee: '',
    type: '',
    title: '',
    content: '',
    decisionDate: '',
    date: '',
    files: []
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

 ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/ulesek/' + this.postId)
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
    if(this.mode === 'createNewPost') {
      this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form);
    }
  }

  addNewPost(form : NgForm) {
    const newPost : Ulesek = {
      _id: null,
      author: 'Test',
      committee: form.value.newRegistryGroup.committee,
      type: form.value.newRegistryGroup.type,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      decisionDate: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files,
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/ulesek', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Ulesek = {
      _id: id,
      author: 'Test',
      committee: form.value.newRegistryGroup.committee,
      type: form.value.newRegistryGroup.type,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      decisionDate: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/ulesek/' + id, post)
      .subscribe((data) => {
        console.log(data);
      })
  }

  emitSelectedOption(value: string) {
    this.selectedOptionEvent.emit(value);
    console.log(value)
  }

}
