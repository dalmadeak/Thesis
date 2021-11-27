import { Injectable, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Felhasznalo } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  modalRef: BsModalRef = new BsModalRef();

  private token : string | null = '';
  private userAuthStatus = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userInfo: any;

  constructor(private http: HttpClient, private router: Router, private modalService: BsModalService, private spinner: NgxSpinnerService) {}

  login(form: NgForm, template: TemplateRef<any>) {
    this.spinner.show();
    const userData: Felhasznalo = {
      _id: null,
      postType: 'auth',
      identifier: form.value.profileGroup.identifier,
      fullName: '',
      password: form.value.profileGroup.password,
      position: '',
      email: '',
      permissions: ''
    }
    this.http.post<{token: string, expiresIn: number, userId: string, fullName: string, email: string, position: string, permissions: string}>('http://localhost:3000/api/auth/login', userData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresIn = response.expiresIn;
          this.setUserTimer(expiresIn);
          this.isAuthenticated = true;
          this.userInfo = {
            userId: response.userId,
            fullName: response.fullName,
            permissions: response.permissions,
            position: response.position,
            email: response.email
          }
          this.userAuthStatus.next(true);
          let expiration = this.getInTime(expiresIn);
          this.saveUserData(this.token, expiration, this.userInfo);
          this.router.navigate(['/']);
        }
      }, error => {
        this.userAuthStatus.next(false);
        this.openModal(template);
      })
      this.spinner.hide();
  }

  logout() {
    this.spinner.show();
    this.clearUserData();
    this.token = null;
    this.isAuthenticated = false;
    this.userInfo = null;
    this.userAuthStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
    this.spinner.hide();
  }

  private saveUserData(token: string, expiration: Date, userInfo: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('userId', userInfo.userId);
    localStorage.setItem('fullName', userInfo.fullName);
    localStorage.setItem('email', userInfo.email);
    localStorage.setItem('position', userInfo.position);
    localStorage.setItem('permissions', userInfo.permissions);
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('position');
    localStorage.removeItem('permissions');
  }

  private getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userInfo = {
      userId: localStorage.getItem('userId'),
      fullName: localStorage.getItem('fullName'),
      email: localStorage.getItem('email'),
      permissions: localStorage.getItem('permissions'),
      position: localStorage.getItem('position'),
    }
    if(token && expiration && userInfo) {
      return {
        token: token,
        expiration: new Date(expiration),
        userInfo: userInfo
      }
    } else {
      return {
        token: null,
        expiration: null,
        userInfo: null,
      }
    }
  }

  private setUserTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000 * 60);
  }

  getUserInformation() {
    return this.userInfo;
  }

  getInTime(number : number) {
    const today = new Date();
    return new Date(today.getTime() + number * 1000 * 60);
  }

  authUser() {
    const user = this.getUserData();
    const today = new Date();
    if (user.expiration) {
      const isValidExpiration = user.expiration > today;
      if(isValidExpiration) {
        this.token = user.token,
        this.userInfo = user.userInfo,
        this.isAuthenticated = true;
        this.setUserTimer((user.expiration.getTime() - today.getTime()) / 60000);
        this.userAuthStatus.next(true);
      }
    }
  }

  getUserAuthorizationLevel(user: any){
    if(!user) {
      return 6;
    }
    switch(user.permissions){
      case 'admin':
        return 1;
      case 'elnokseg':
        return 2;
      case 'kabinet':
        return 3;
      case 'jegyzokonyvvezeto':
        return 4;
      default:
        return 5;
    }
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserStatusListener() {
    return this.userAuthStatus.asObservable();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  back(): void {
    this.modalRef.hide();
  }

}
