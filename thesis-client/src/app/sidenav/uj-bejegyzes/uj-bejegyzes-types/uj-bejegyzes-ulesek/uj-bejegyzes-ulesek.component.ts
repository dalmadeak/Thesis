import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Ulesek } from '../../../../ulesek/ulesek.model';
import { Felhasznalo } from 'src/app/bejelentkezes/user.model';
import { UserService } from 'src/app/bejelentkezes/user.service';

import { environment } from "../../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/ulesek';

@Component({
  selector: 'app-uj-bejegyzes-ulesek',
  templateUrl: './uj-bejegyzes-ulesek.component.html',
  styleUrls: ['./uj-bejegyzes-ulesek.component.css','../uj-bejegyzes-types.component.css']
})
export class UjBejegyzesUlesekComponent implements OnInit {
  private mode = 'createNewPost'
  private postId : any;
  private author: any;

  modalRef: BsModalRef = new BsModalRef();
  isContentClicked = false;
  isTitleClicked = false;

  dateNow: string = '';
  timeNow: string = '';

  editablePost : Ulesek = {
    _id : '',
    postType: '',
    author: '',
    committee: '',
    type: '',
    title: '',
    content: '',
    decisionDate: '',
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
    this.author = this.userService.getUserInformation();
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
      }
    });
  }

  async onSubmit(form: NgForm) {
    if(this.mode === 'createNewPost') {
      await this.addNewPost(form, this.author);
    } else if (this.mode === 'editPost') {
      await this.updatePost(this.postId, form, this.author);
    }
    this.modalRef.hide();
    this.router.navigate(['/ulesek']);
  }

  addNewPost(form : NgForm, author: Felhasznalo) {
    const newPost : Ulesek = {
      _id: null,
      postType: 'ulesek',
      author: author,
      committee: form.value.newRegistryGroup.committee,
      type: form.value.newRegistryGroup.type,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      decisionDate: form.value.newRegistryGroup.decisionDate + ' ' + form.value.newRegistryGroup.decisionTime,
      date: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time,
    }

    return new Promise(resolve => {this.http.post<{ message: string, postId: string }>(BACKEND_URL, newPost)
      .subscribe((data) => {
        const id = data.postId;
        newPost._id = id;
        resolve(data);
      })
    });
  }

  async updatePost(id: string, form: NgForm, author: Felhasznalo) {
    const post : Ulesek = {
      _id: id,
      postType: 'ulesek',
      author: author,
      committee: form.value.newRegistryGroup.committee,
      type: form.value.newRegistryGroup.type,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      decisionDate: form.value.newRegistryGroup.decisionDate + ' ' + form.value.newRegistryGroup.decisionTime,
      date: form.value.newRegistryGroup.date + ' ' + form.value.newRegistryGroup.time,
    }

    return new Promise(resolve => {this.http.put<{ message: string }>(BACKEND_URL + '/' + id, post)
      .subscribe((data) => {
        resolve(data);
      })
    });
  }

  onTitleClicked(form: NgForm) {
    this.generateMeetingTitle(form);
  }

  onContentClicked(form: NgForm) {
    this.generateMeetingContent(form, this.author);
  }

  generateMeetingTitle(form: NgForm) {
    if(this.isTitleClicked || this.mode == 'editPost' || !this.checkInputValidity(form)) return;
    this.isTitleClicked = true;

    let title =
    ("ELTE IK H??K "
    + (this.getCommitteeName(form.value.newRegistryGroup.committee) || '[BIZOTTS??G]')
    + ' '
    + (form.value.newRegistryGroup.type || '[T??PUS]')
    + ' ??l??se - '
    + (form.value.newRegistryGroup.decisionDate.split('-').join('. ') || '[D??TUM]')
    +  ". "
    + (form.value.newRegistryGroup.decisionTime || '[ID??PONT]')
    );

    this.editablePost.title = title;
  }

  generateMeetingContent(form: NgForm, author: Felhasznalo){
    if(this.isContentClicked || this.mode == 'editPost' || !this.checkInputValidity(form)) return;
    this.isContentClicked = true;
    let appendix = ['a','e','i','o','u'].includes(author.email.charAt(0)) ? 'az' : 'a'

    let content =
    ("Tisztelt K??ld??ttek, Tiszts??gvisel??k! Kedves Hallgat??k!\n\n??sszeh??vom az ELTE IK H??K "
    + (this.getCommitteeName(form.value.newRegistryGroup.committee) || '[BIZOTTS??G]')
    + " "
    + (form.value.newRegistryGroup.type || '[T??PUS]')
    + " ??l??s??t.\n"
    + "Id??pont: "
    + (form.value.newRegistryGroup.decisionDate.split('-').join('. ') || '[D??TUM]')
    + ". "
    + (form.value.newRegistryGroup.decisionTime || '[ID??PONT]')
    + "\nHelysz??n: ELTE IK H??K iroda (1117 Budapest, P??zm??ny P??ter s??t??ny 1/A, -1.66/B).\n\n"
    + "Az el??zetes napirendi pontok a k??vetkez??k: \n"
    + " 1. T??j??koztat??\n 2. Feladatok\n 3. Egyebek\n\n"
    + "Az esetleges kiment??seket, illetve napirendipont-m??dos??t?? javaslatokat "
    + appendix
    + " "
    + author.email
    + " e-mail c??mre v??rom.\n\n"
    + "Tisztelettel,\n"
    + author.fullName + "\n"
    + author.position + "\n"
    + "ELTE IK H??K\n"
    + "1117 Budapest, P??zm??ny P??ter s??t??ny 1/A -1.66B\n"
    + "tel: +36 1 372 25 20\n"
    + "e-mail: " + author.email
    + "\nweb: http://ikhok.elte.hu\n");

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

  getCommitteeName(committee: string) {
    switch(committee) {
      case 'kgy':
        return 'K??ld??ttgy??l??s';
      case 'elnokseg':
        return 'Eln??ks??g';
      case 'kabinet':
        return 'Kabinet';
      case 'hjb':
        return 'Hallgat??i J??l??ti Bizotts??g';
      case 'kombiz':
        return 'Kommunik??ci??s Bizotts??g';
      case 'kb':
        return 'K??l??gyi Bizotts??g';
      case 'szb':
        return 'Szervez?? Bizotts??g';
      case 'tb':
        return 'Tanulm??nyi Bizotts??g';
      case 'eb':
        return 'Ellen??rz?? Bizotts??g';
      default:
        return 'V??laszt??si Bizotts??g';
    }
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
