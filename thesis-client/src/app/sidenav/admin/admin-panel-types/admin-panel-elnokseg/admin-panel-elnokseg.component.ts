import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Elnokseg } from 'src/app/szervezet/szervezet-elnokseg/elnokseg.model';
import { mimeType } from '../mime-type.validator';


@Component({
  selector: 'app-admin-panel-elnokseg',
  templateUrl: './admin-panel-elnokseg.component.html',
  styleUrls: ['./admin-panel-elnokseg.component.css', '../admin-panel-types.component.css']
})
export class AdminPanelElnoksegComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  form: any;
  imagePreview: string = '';

  modalRef: BsModalRef = new BsModalRef();
  editablePost : Elnokseg = {
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
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/elnokseg/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
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

  async onSubmit() {
    if(this.mode === 'createNewPost') {
      await this.addNewPost();
    } else if (this.mode === 'editPost') {
      await this.updatePost(this.postId, this.form.value.file);
    }

    this.form.reset();
    this.modalRef.hide();
    this.router.navigate(['/szervezet/elnokseg']);
  }

  addNewPost() {
    const postData = new FormData();
    postData.append('_id', '');
    postData.append('postType', 'elnokseg');
    postData.append('name', this.form.value.name);
    postData.append('position', this.form.value.position);
    postData.append('email', this.form.value.email);
    postData.append('file', this.form.value.file, this.form.value.name);

    return new Promise(resolve => {this.http.post<{ message: string, post: Elnokseg }>('http://localhost:3000/api/elnokseg', postData)
      .subscribe((data) => {
        resolve(data);
      })
    });
  }

  updatePost(id: string, file: File | string) {
    let postData : Elnokseg | FormData;
    if(typeof(file) === "object") {
      postData = new FormData();

      postData.append('_id', id);
      postData.append('postType', 'elnokseg');
      postData.append('name', this.form.value.name);
      postData.append('position', this.form.value.position);
      postData.append('email', this.form.value.email);
      postData.append('file', file, this.form.value.name);
    } else {
      postData = {
        _id: id,
        postType: 'elnokseg',
        name: this.form.value.name,
        position: this.form.value.position,
        email:  this.form.value.email,
        file: this.form.value.file,
      }
    }

    return new Promise(resolve => {this.http.put<{ message: string }>('http://localhost:3000/api/elnokseg/' + id, postData)
      .subscribe((data) => {
        resolve(data);
      })
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();

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
    this.modalRef.hide();
  }

}
