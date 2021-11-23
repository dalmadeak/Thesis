import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Felhasznalo } from "./user.model";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserService {
  private token : string | null = '';
  private userAuthStatus = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(form: NgForm) {
    const userData: Felhasznalo = {
      _id: null,
      postType: 'auth',
      identifier: form.value.profileGroup.identifier,
      password: form.value.profileGroup.password,
      position: '',
      email: ''
    }
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/auth/login', userData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresIn = response.expiresIn;
          this.setUserTimer(expiresIn);
          this.isAuthenticated = true;
          this.userAuthStatus.next(true);
          let expiration = this.getInTime(expiresIn)
          this.saveUserData(this.token, expiration)
        }
      })
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userAuthStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearUserData();
    this.router.navigate(['/']);
  }

  private saveUserData(token: string, expiration: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if(token && expiration) {
      return {
        token: token,
        expiration: new Date(expiration),
      }
    } else {
      return {
        token: null,
        expiration: null
      }
    }
  }

  private setUserTimer(duration: number) {
    console.log(duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000 * 60);
  }

  getInTime(number : number) {
    const today = new Date();
    return new Date(today.getTime() + number * 1000 * 60);
  }

  authUser() {
    const userInfo = this.getUserData();
    const today = new Date();
    if (userInfo.expiration) {
      const isValidExpiration = userInfo.expiration > today;
      if(isValidExpiration) {
        this.token = userInfo.token,
        this.isAuthenticated = true;
        this.setUserTimer((userInfo.expiration.getTime() - today.getTime()) / 60000);
        this.userAuthStatus.next(true);
      }
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

}
