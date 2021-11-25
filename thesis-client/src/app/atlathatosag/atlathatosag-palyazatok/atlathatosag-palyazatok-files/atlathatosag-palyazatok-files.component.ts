import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Palyazatok } from '../palyazatok.model';
import { map } from 'rxjs/operators'
import { faDownload, faFile, faFilePdf, faFileArchive, faChevronDown, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "src/app/bejelentkezes/user.service";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-atlathatosag-palyazatok-files',
  templateUrl: './atlathatosag-palyazatok-files.component.html',
  styleUrls: ['../../atlathatosag.component.css']
})
export class AtlathatosagPalyazatokFilesComponent implements OnInit{
  p : number = 1;

  faFile = faFile;
  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faChevronDown = faChevronDown;
  faFileZip = faFileArchive;
  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private palyazatokObject : Palyazatok[] = [];
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    this.getPosts();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this. userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  //Ez csak egy kopija az eredetinek, mert inmutable-nek kéne maradni
  getObject() {
    return [...this.palyazatokObject].slice().reverse();
  }

  getPosts() {
    this.spinner.show();
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/palyazatok')
      .pipe(map(postData => {
        return postData.posts.map((post: any) => {
         return {
            _id: post._id,
            postType: post.postType,
            title: post.title,
            content: post.content,
            date: post.date,
            file: post.file
          }
        });
      }))
      .subscribe((finalPosts) => {
        this.palyazatokObject = finalPosts;
        this.spinner.hide();
      });
  }

  deletePost(postId : string) {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/palyazatok/' + postId)
      .subscribe(() => {
        const updatedPost = this.palyazatokObject.filter(post => post._id !== postId);
        this.palyazatokObject = updatedPost;
      })
  }

  getAuthLevel() {
    return this.authLevel;
  }

  onSortByName(){
    return this.palyazatokObject.sort((a,b) => (a.title > b.title) ? 1 : -1);
  }

  onSortByUploadDate(){
    return this.palyazatokObject.sort((a,b) => (a.date > b.date) ? 1 : -1);
  }

  getFileExtension(fileName : string) {
    return fileName.substr(fileName.indexOf('.'));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }

}
