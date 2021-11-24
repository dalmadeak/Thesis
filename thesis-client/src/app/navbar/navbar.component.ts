import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { faBars, faEllipsisH, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
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
  message: string = '';
  isAuthenticated = false;

  private userAuthSubs : Subscription | undefined;

  constructor(private userService : UserService, private modalService: BsModalService) {}

  ngOnInit() {
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userAuthSubs = this.userService.getUserStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  onLogout() {
    this.message = 'Elfogadva!';
    this.modalRef.hide();
    this.userService.logout();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }
}
