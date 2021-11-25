import { Injectable, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Felhasznalo } from "./user.model";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Injectable({providedIn: 'root'})
export class UserService {
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';

  private token : string | null = '';
  private userAuthStatus = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  private userInfo: any;

  constructor(private http: HttpClient, private router: Router, private modalService: BsModalService) {}

  login(form: NgForm, template: TemplateRef<any>) {
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
          let expiration = this.getInTime(expiresIn)
          this.saveUserData(this.token, expiration, this.userInfo)
          setTimeout(() => {this.router.navigate(['/'])}, 1000);
        }
      }, error => {
        this.userAuthStatus.next(false);
        this.openModal(template);
      })
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userInfo = null;
    this.userAuthStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearUserData();
    this.router.navigate(['/']);
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
    console.log(duration)
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
    this.message = 'Elutasítva!';
    this.modalRef.hide();
  }

}
