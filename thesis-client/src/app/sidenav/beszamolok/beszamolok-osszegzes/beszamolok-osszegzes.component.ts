import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/bejelentkezes/user.service';
import { SajatBeszamolok } from '../../sajat-beszamolok/sajat-beszamolok.model';

@Component({
  selector: 'app-beszamolok-osszegzes',
  templateUrl: './beszamolok-osszegzes.component.html',
  styleUrls: ['./beszamolok-osszegzes.component.css']
})
export class BeszamolokOsszegzesComponent implements OnInit{
  @Input() summarizeObject : any = [];
  @Output() refreshObjectEvent = new EventEmitter<Array<Object> >();

  faEdit = faPencilAlt;
  faDelete = faTrash;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private userData: any;
  private authLevel: number = 5;

  constructor(private http: HttpClient, private modalService: BsModalService, private userService : UserService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    this.getObject();
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  getObject() {
    return [...this.summarizeObject];
  }

  deletePost(postId : string) {
    this.modalRef.hide();
    this.http.delete('http://localhost:3000/api/havi-beszamolok/' + postId)
      .subscribe(() => {
        const updatedPost = this.summarizeObject.filter((post : any) => post._id !== postId);
        this.summarizeObject = updatedPost;
        this.updateSummarizeObject(this.summarizeObject);
      })
  }

  updateSummarizeObject(value : any) {
    this.refreshObjectEvent.emit(value);
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
