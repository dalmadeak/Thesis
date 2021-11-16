import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Hatarozat } from 'src/app/sidenav/hatarozatok/hatarozatok.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uj-bejegyzes-hatarozatok',
  templateUrl: './uj-bejegyzes-hatarozatok.component.html',
  styleUrls: ['./uj-bejegyzes-hatarozatok.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesHatarozatokComponent implements OnInit {
  @Output() selectedOptionEvent = new EventEmitter<string>();

  selectedOption : string = 'b-hatarozat';

  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  editablePost : Hatarozat = {
    _id: '',
    committee: '',
    number: '',
    decisionDate: '',
    content: '',
    mandate: 0,
    vote: '',
    date: '',
    files: []
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router) {
  }

 ngOnInit() {
  this.emitSelectedOption(this.selectedOption);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'editPost';
        this.postId = paramMap.get('id');
        this.http.get<{message: string, post: any }>('http://localhost:3000/api/hatarozatok/' + this.postId)
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
    setTimeout(() => {this.router.navigate(['/atlathatosag/hatarozatok']);},0);
  }
  addNewPost(form : NgForm) {
    const newPost : Hatarozat = {
      _id: null,
      committee: form.value.newRegistryGroup.committee,
      number: form.value.newRegistryGroup.number,
      decisionDate: form.value.newRegistryGroup.decisionDate + ' ' + form.value.newRegistryGroup.decisionTime,
      content: form.value.newRegistryGroup.content,
      mandate: form.value.newRegistryGroup.mandate,
      vote: form.value.newRegistryGroup.vote,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files
    }

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/hatarozatok', newPost)
      .subscribe((data) => {
      const id = data.postId;
      newPost._id = id;
    });
  }

  updatePost(id: string, form: NgForm) {
    const post : Hatarozat = {
      _id: id,
      committee: form.value.newRegistryGroup.committee,
      number: form.value.newRegistryGroup.number,
      decisionDate: form.value.newRegistryGroup.decisionDate,
      content: form.value.newRegistryGroup.content,
      mandate: form.value.newRegistryGroup.mandate,
      vote: form.value.newRegistryGroup.vote,
      date: form.value.newRegistryGroup.postDate + ' ' + form.value.newRegistryGroup.postTime,
      files: form.value.newRegistryGroup.files
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/hatarozatok/' + id, post)
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

  emitSelectedOption(value: string) {
    this.selectedOptionEvent.emit(value);
    console.log(value)
  }

}
