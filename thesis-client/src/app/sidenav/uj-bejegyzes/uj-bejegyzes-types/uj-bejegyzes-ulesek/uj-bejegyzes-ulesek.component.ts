import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Ulesek } from '../../../../ulesek/ulesek.model';

@Component({
  selector: 'app-uj-bejegyzes-ulesek',
  templateUrl: './uj-bejegyzes-ulesek.component.html',
  styleUrls: ['./uj-bejegyzes-ulesek.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesUlesekComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  isContentClicked = false;
  isTitleClicked = false;

  today = new Date();
  now = this.today.getFullYear() + '-' + (this.today.getMonth()+1) + '-' + this.today.getDate() + ' ' + this.today.getHours() + ':' + this.today.getMinutes()

  editablePost : Ulesek = {
    _id : '',
    postType: '',
    author: '',
    committee: '',
    type: '',
    title: '',
    content: '',
    decisionDate: '',
    date: this.now
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
    this.message = 'Elfogadva';
    if(this.mode === 'createNewPost') {
      this.addNewPost(form);
    } else if (this.mode === 'editPost') {
      this.updatePost(this.postId, form);
    }
    this.modalRef.hide();
    setTimeout(() => {this.router.navigate(['/ulesek']);},0);
  }

  addNewPost(form : NgForm) {
    console.log(form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time)
    const newPost : Ulesek = {
      _id: null,
      postType: 'ulesek',
      author: 'Test',
      committee: form.value.newRegistryGroup.committee,
      type: form.value.newRegistryGroup.type,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      decisionDate: form.value.newRegistryGroup.decisionDate + ' ' + form.value.newRegistryGroup.decisionTime,
      date: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time,
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
      postType: 'ulesek',
      author: 'Test',
      committee: form.value.newRegistryGroup.committee,
      type: form.value.newRegistryGroup.type,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      decisionDate: form.value.newRegistryGroup.decisionDate + ' ' + form.value.newRegistryGroup.decisionTime,
      date: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time,
    }
    this.http.put<{ message: string }>('http://localhost:3000/api/ulesek/' + id, post)
      .subscribe((data) => {
        console.log(data);
      })
  }

  generateMeetingTitle(form: NgForm) {
    if(this.isTitleClicked || this.mode == 'editPost' || !this.checkInputValidity(form)) return;
    this.isTitleClicked = true;

    let title =
    ("ELTE IK HÖK "
    + (form.value.newRegistryGroup.committee || '[BIZOTTSÁG]')
    + ' '
    + (form.value.newRegistryGroup.type || '[TÍPUS]')
    + ' ülése - '
    + (form.value.newRegistryGroup.decisionDate.split('-').join('. ') || '[DÁTUM]')
    +  ". "
    + (form.value.newRegistryGroup.decisionTime || '[IDŐPONT]')
    );

    this.editablePost.title = title;
  }

  generateMeetingContent(form: NgForm){
    if(this.isContentClicked || this.mode == 'editPost' || !this.checkInputValidity(form)) return;
    this.isContentClicked = true;
    let author="elnok@ikhok.elte.hu";
    let appendix = ['a','e','i','o','u'].includes(author.charAt(0)) ? 'az' : 'a'

    let content =
    ("Tisztelt Küldöttek, Tisztségviselők! Kedves Hallgatók!\n\nÖsszehívom az ELTE IK HÖK "
    + (form.value.newRegistryGroup.committee || '[BIZOTTSÁG]')
    + " "
    + (form.value.newRegistryGroup.type || '[TÍPUS]')
    + " ülését.\n"
    + "Időpont: "
    + (form.value.newRegistryGroup.decisionDate.split('-').join('. ') || '[DÁTUM]')
    + ". "
    + (form.value.newRegistryGroup.decisionTime || '[IDŐPONT]')
    + "\nHelyszín: IK HÖK iroda (1117 Budapest, Pázmány Péter sétány 1/a, -1.66/B).\n\n"
    + "Az előzetes napirendi pontok a következők: \n"
    + " 1. Tájékoztató\n 2. Feladatok\n 3. Egyebek\n\n"
    + "Az esetleges kimentéseket, illetve napirendipont-módosító javaslatokat "
    + appendix
    + " "
    + author
    + " e-mail címre várom.\n\n"
    + "Tisztelettel,\n"
    + author);

    this.editablePost.content = content;
  }

  checkInputValidity(form: NgForm) {
    return (
      form.value.newRegistryGroup.committee &&
      form.value.newRegistryGroup.type &&
      form.value.newRegistryGroup.decisionDate &&
      form.value.newRegistryGroup.decisionTime
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
