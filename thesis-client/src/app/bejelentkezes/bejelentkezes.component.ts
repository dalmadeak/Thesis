import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private userAuthSubs : Subscription | undefined;

  constructor(private userService : UserService) { }

  ngOnInit(){
    this.userAuthSubs = this.userService.getUserStatusListener().subscribe( status => {
    })
  }

  ngOnDestroy() {
    this.userAuthSubs?.unsubscribe();
  }

  onLogin(form: NgForm, template: TemplateRef<any>) {
    this.userService.login(form, template);
  }

  getUserService() {
    return this.userService;
  }

}
