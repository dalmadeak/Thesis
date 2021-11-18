import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Kabinet } from 'src/app/szervezet/szervezet-kabinet/kabinet.model';
import { mimeType } from '../mime-type.validator';


@Component({
  selector: 'app-admin-panel-kabinet',
  templateUrl: './admin-panel-kabinet.component.html',
  styleUrls: ['./admin-panel-kabinet.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelKabinetComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  form: any;
  imagePreview: string = '';

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Kabinet = {
    _id : '',
    postType: '',
    name: '',
    position: '',
    email: '',
    file: '',
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,) {
  }

 ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'position': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'file': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/kabinet/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
          console.log(this.editablePost)
          this.form.setValue(
            {
              'name': this.editablePost.name,
              'position': this.editablePost.position,
              'email': this.editablePost.email,
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
    setTimeout(() => {this.router.navigate(['/szervezet/kabinet']);},0);
  }

  addNewPost() {
    /*const newPost : Kabinet = {
      _id: null,
      postType: 'kabinet',
      name: this.form.value.name,
      position: this.form.value.position,
      email: this.form.value.email,
      file: this.form.value.file,
    }*/
    const postData = new FormData();
    postData.append('_id', '');
    postData.append('postType', 'kabinet');
    postData.append('name', this.form.value.name);
    postData.append('position', this.form.value.position);
    postData.append('email', this.form.value.email);
    postData.append('file', this.form.value.file, this.form.value.name);

    this.http.post<{ message: string, post: Kabinet }>('http://localhost:3000/api/kabinet', postData)
      .subscribe((data) => {
      const newPost: Kabinet = {
        _id: data.post._id,
        postType: 'kabinet',
        name: this.form.value.name,
        position: this.form.value.position,
        email: this.form.value.email,
        file: data.post.file,
      }
      console.log(newPost);
    });
  }

  updatePost(id: string, file: File | string) {
    /*const post : Kabinet = {
      _id: id,
      postType: 'kabinet',
      name: this.form.value.name,
      position: this.form.value.position,
      email:  this.form.value.email,
      file: this.form.value.file,
    }*/
    let postData : Kabinet | FormData;
    if(typeof(file) === "object") {
      postData = new FormData();

      postData.append('_id', id);
      postData.append('postType', 'kabinet');
      postData.append('name', this.form.value.name);
      postData.append('position', this.form.value.position);
      postData.append('email', this.form.value.email);
      postData.append('file', file, this.form.value.name);
    } else {
      postData = {
        _id: id,
        postType: 'kabinet',
        name: this.form.value.name,
        position: this.form.value.position,
        email:  this.form.value.email,
        file: this.form.value.file,
      }
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/kabinet/' + id, postData)
      .subscribe((data) => {
        const newPost: Kabinet = {
          _id: id,
          postType: 'kabinet',
          name: this.form.value.name,
          position: this.form.value.position,
          email: this.form.value.email,
          file: ''
        }
      })
  }

  onImagePicked(event: Event) {
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
