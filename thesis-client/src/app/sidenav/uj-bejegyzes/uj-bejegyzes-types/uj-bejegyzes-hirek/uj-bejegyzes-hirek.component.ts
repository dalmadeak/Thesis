import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Hirek } from '../../../../hirek/hirek.model';

@Component({
  selector: 'app-uj-bejegyzes-hirek',
  templateUrl: './uj-bejegyzes-hirek.component.html',
  styleUrls: ['./uj-bejegyzes-hirek.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesHirekComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Hirek = {
    _id : '',
    postType: '',
    title: '',
    content: '',
    date: ''
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/hirek/' + this.postId)
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
    setTimeout(() => {this.router.navigate(['/hirek']);},0);
  }

  addNewPost(form : NgForm) {
    const newPost : Hirek = {
      _id: null,
      postType: 'hirek',
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/hirek', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Hirek = {
      _id: id,
      postType: 'hirek',
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/hirek/' + id, post)
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
