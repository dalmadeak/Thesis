import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";

import { Kuldottgyules } from "./kuldottgyules.model";
import { Subscription } from "rxjs";
import { UserService } from "src/app/bejelentkezes/user.service";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/kuldottgyules';

@Component ({
  selector: 'app-szervezet-kgy',
  templateUrl: './szervezet-kgy.component.html',
  styleUrls: ['./szervezet-kgy.component.css']
})
export class SzervezetKuldottgyulesComponent implements OnInit {
  brief: string = 'Az Önkormányzat legfőbb döntéshozó és ellenőrző szerve a Küldöttgyűlés, amely dönthet minden olyan ügyben, amit az Alapszabály, jogszabály, egyetemi, kari vagy egyéb szabályzat, egyedi aktus a hatáskörébe utal. A Küldöttgyűlés ezen túlmenően az Alapszabályban meghatározott kivételektől eltekintve bármely más szervének, testületének vagy tisztségviselőjének már meghozott döntéseit másodfokon eljárva felülbírálhatja. Ilyen kivételnek minősül, amikor az Alapszabály a döntést az Önkormányzat más szervének, testületének vagy tisztségviselőjének kizárólagos hatáskörébe utalja';

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  colspan: number = 3;
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private kuldottgyulesObject : Kuldottgyules[] = [];
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    this.getPosts();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    if (this.isAuthenticated && this.getAuthLevel() == 1) {
      this.colspan = 4;
    } else {
      this.colspan = 3;
    }
    this. userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  getObject() {
    return [...this.kuldottgyulesObject].sort((a,b) => (a.fullName.localeCompare(b.fullName) > 0) ? 1 : ((a.fullName.localeCompare(b.fullName) <= 0) ? -1 : 0));
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

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete(BACKEND_URL + '/' + postId)
      .subscribe(() => {
        const updatedPost = this.kuldottgyulesObject.filter(post => post._id !== postId);
        this.kuldottgyulesObject = updatedPost;
      })
  }

  getCommitteeName(committee: string) {
    switch(committee) {
      case 'hjb':
        return 'Hallgatói Jóléti Bizottság';
      case 'kombiz':
        return 'Kommunikációs Bizottság';
      case 'kb':
        return 'Külügyi Bizottság';
      case 'szb':
        return 'Szervező Bizottság';
      case 'tb':
        return 'Tanulmányi Bizottság';
      case 'eb':
        return 'Ellenőrző Bizottság';
      default:
        return 'Választási Bizottság';
    }
  }

  getAuthLevel() {
    return this.authLevel;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
}
