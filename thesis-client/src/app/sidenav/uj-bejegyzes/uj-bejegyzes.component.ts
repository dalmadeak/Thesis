import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Hirek } from '../../hirek/hirek.model';

@Component({
  selector: 'app-uj-bejegyzes',
  templateUrl: './uj-bejegyzes.component.html',
  styleUrls: ['./uj-bejegyzes.component.css']
})
export class UjBejegyzesComponent implements OnInit{
  selectedOption : string = 'hir';

  private mode = 'createNewPost'
  private postId : any;
  editablePost : Hirek = {
    _id : '',
    title: '',
    content: '',
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
    if(this.mode === 'createNewPost') {
      this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form);
    }
  }

  addNewPost(form : NgForm) {
    const newPost : Hirek = {
      _id: null,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files
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
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/hirek/' + id, post)
      .subscribe((data) => {
        console.log(data);
      })
  }
}
