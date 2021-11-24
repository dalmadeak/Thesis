import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { SajatBeszamolok } from '../../../sajat-beszamolok/sajat-beszamolok.model';
import { UserService } from 'src/app/bejelentkezes/user.service';
import { Felhasznalo } from 'src/app/bejelentkezes/user.model';

@Component({
  selector: 'app-uj-bejegyzes-sajat-beszamolok',
  templateUrl: './uj-bejegyzes-sajat-beszamolok.component.html',
  styleUrls: ['./uj-bejegyzes-sajat-beszamolok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesSajatBeszamolokComponent implements OnInit {
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  isDisabled: boolean = false;

  today = new Date();
  now = this.today.getFullYear() + '-' + (this.today.getMonth()+1) + '-' + this.today.getDate() + ' ' + this.today.getHours() + ':' + this.today.getMinutes()

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
    date: this.now,
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private userService: UserService) {
  }

 ngOnInit() {
  this.author = this.userService.getUserInformation();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/havi-beszamolok/' + this.postId)
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
      this.addNewPost(form, this.author);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form, this.author);
    }
    this.modalRef.hide();
    setTimeout(() => {this.router.navigate(['/sidenav/beszamolok/sajat']);},0);
  }

  addNewPost(form : NgForm, author: Felhasznalo) {
    const newPost : SajatBeszamolok = {
      _id: null,
      author: author,
      postType: 'sajat',
      year: form.value.newRegistryGroup.year,
      month: form.value.newRegistryGroup.month,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/havi-beszamolok', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
      console.log(newPost)
    });
  }

  updatePost(id: string, form: NgForm, author: Felhasznalo) {
    const post : SajatBeszamolok = {
      _id: id,
      author: author,
      postType: 'sajat',
      year: form.value.newRegistryGroup.year,
      month: form.value.newRegistryGroup.month,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/havi-beszamolok/' + id, post)
      .subscribe((data) => {
        console.log(post);
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
