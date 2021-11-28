import { HttpClient } from "@angular/common/http";
import { Component, NgModule, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";

import { Kuldottgyules } from "../szervezet-kgy/kuldottgyules.model";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/kuldottgyules';

@Component ({
  selector: 'app-szervezet-bizottsagok',
  templateUrl: './szervezet-bizottsagok.component.html',
  styleUrls: ['./szervezet-bizottsagok.component.css']
})
export class SzervezetBizottsagokComponent implements OnInit {
  brief: string = 'Az Önkormányzat legfőbb döntéshozó és ellenőrző szerve a Küldöttgyűlés, amely dönthet minden olyan ügyben, amit az Alapszabály, jogszabály, egyetemi, kari vagy egyéb szabályzat, egyedi aktus a hatáskörébe utal. A Küldöttgyűlés ezen túlmenően az Alapszabályban meghatározott kivételektől eltekintve bármely más szervének, testületének vagy tisztségviselőjének már meghozott döntéseit másodfokon eljárva felülbírálhatja. Ilyen kivételnek minősül, amikor az Alapszabály a döntést az Önkormányzat más szervének, testületének vagy tisztségviselőjének kizárólagos hatáskörébe utalja';

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();

  private kuldottgyulesObject : Kuldottgyules[] = [];

  committeesObject = [
    {
      committee: 'hjb',
      name: 'Hallgatói Jóléti Bizottság'
    },
    {
      committee: 'kombiz',
      name: 'Kommunikációs Bizottság'
    },
    {
      committee: 'kb',
      name: 'Külügyi Bizottság'
    },
    {
      committee: 'szb',
      name: 'Szervező Bizottság'
    },
    {
      committee: 'tb',
      name: 'Tanulmányi Bizottság'
    },
    {
      committee: 'eb',
      name: 'Ellenőrző Bizottság'
    },
    {
      committee: 'vb',
      name: 'Választási Bizottság'
    }
  ]

  constructor(private http: HttpClient, private modalService: BsModalService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getObject() {
    return [...this.kuldottgyulesObject].sort((a,b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0));
  }

  getPosts() {
    this.spinner.show();
    this.http.get<{message: string, posts: any }>(BACKEND_URL)
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            fullName: post.fullName,
            firstCommittee: post.firstCommittee,
            firstPosition: post.firstPosition,
            secondCommittee: post.secondCommittee,
            secondPosition: post.secondPosition,
            email: post.email
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.kuldottgyulesObject = finalPosts;
        this.spinner.hide();
      });
  }

  getPosition(position: string) {
    if(position == 'elnok') {
      return 'Bizottsági Elnök'
    }
    return 'Tag'
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
