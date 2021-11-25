import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private userAuthSubs : Subscription | undefined;

  constructor(private userService : UserService, private router: Router, private modalService: BsModalService) { }

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
