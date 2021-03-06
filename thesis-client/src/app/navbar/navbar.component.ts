import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { faBars, faEllipsisH, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { UserService } from "../bejelentkezes/user.service";

@Component ({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  faBars = faBars;
  faDots = faEllipsisH;
  faLogin = faSignInAlt;
  faLogout = faSignOutAlt;

  modalRef: BsModalRef = new BsModalRef();
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;
  private userData: any;
  private authLevel: number = 5;

  constructor(private modalService: BsModalService, private userService : UserService) {
  }

  ngOnInit() {
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.userData = this.userService.getUserInformation();
      this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  onLogout() {
    this.modalRef.hide();
    this.userData = null;
    this.authLevel = 5;
    this.userService.logout();
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
