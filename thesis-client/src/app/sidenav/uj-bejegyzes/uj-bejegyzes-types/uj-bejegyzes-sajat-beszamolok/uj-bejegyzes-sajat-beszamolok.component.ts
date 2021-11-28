import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { SajatBeszamolok } from '../../../sajat-beszamolok/sajat-beszamolok.model';
import { UserService } from 'src/app/bejelentkezes/user.service';
import { Felhasznalo } from 'src/app/bejelentkezes/user.model';

import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/havi-beszamolok';

@Component({
  selector: 'app-uj-bejegyzes-sajat-beszamolok',
  templateUrl: './uj-bejegyzes-sajat-beszamolok.component.html',
  styleUrls: ['./uj-bejegyzes-sajat-beszamolok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesSajatBeszamolokComponent implements OnInit {
  modalRef: BsModalRef = new BsModalRef();
  isDisabled: boolean = false;

  today = new Date();
  dateNow: string = '';
  timeNow: string = '';


  private mode = 'createNewPost'
  private postId : any;
  private author: any;

  editablePost : SajatBeszamolok = {
    _id : '',
    postType: '',
    author: '',
    year: this.today.getFullYear(),
    month: '',
    content: '',
    date: ''
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private userService: UserService) {
  }

 ngOnInit() {
    this.editablePost.date = this.getDate();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>(BACKEND_URL + '/' + this.postId)
          .subscribe((fetchedData) => {
          this.editablePost = fetchedData.post[0];
        });
      } else {
        this.mode = 'createNewPost';
        this.postId = '';
        this.author = this.userService.getUserInformation();
      }
    });
  }

  async onSubmit(form: NgForm) {
    if(this.mode === 'createNewPost') {
      await this.addNewPost(form, this.author);
    } else if (this.mode === 'editPost') {
      await this.updatePost(this.postId, form);
    }
    this.modalRef.hide();
    this.router.navigate(['/sidenav/beszamolok/sajat']);
  }

  addNewPost(form : NgForm, author: Felhasznalo) {
    const newPost : SajatBeszamolok = {
      _id: null,
      author: author,
      postType: 'sajat',
      year: form.value.newRegistryGroup.year,
      month: form.value.newRegistryGroup.month,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time
    }

    return new Promise(resolve => {this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/havi-beszamolok', newPost)
      .subscribe((data) => {
        const id = data.postId;
        newPost._id = id;
        resolve(data);
      })
    });
  }

  updatePost(id: string, form: NgForm) {
    const post = {
      _id: id,
      year: form.value.newRegistryGroup.year,
      month: form.value.newRegistryGroup.month,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time
    }

    return new Promise(resolve => {this.http.patch<{ message: string }>('http://localhost:3000/api/havi-beszamolok/' + id, post)
      .subscribe((data) => {
        resolve(data);
      })
    });
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

    return this.dateNow + ' ' + this.timeNow;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
