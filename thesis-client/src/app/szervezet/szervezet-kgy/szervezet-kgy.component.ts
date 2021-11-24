import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { Kuldottgyules } from "./kuldottgyules.model";
import { Subscription } from "rxjs";
import { UserService } from "src/app/bejelentkezes/user.service";
import { ThrowStmt } from "@angular/compiler";

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
  message: string = '';
  colspan: number = 3;
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private kuldottgyulesObject : Kuldottgyules[] = [];
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService) {
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

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.kuldottgyulesObject].sort((a,b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0));
  }

  getPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/kuldottgyules')
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
        console.log(this.kuldottgyulesObject)
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/kuldottgyules/' + postId)
      .subscribe(() => {
        const updatedPost = this.kuldottgyulesObject.filter(post => post._id !== postId);
        this.kuldottgyulesObject = updatedPost;
      })
  }

  getCommitteeName(committee: string) {
    switch(committee) {
      case 'kgy':
        return 'Küldöttgyűlés';
      case 'elnokseg':
        return 'Elnökség';
      case 'kabinet':
        return 'Kabinet';
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
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
