import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable()
export class UserGuard implements CanActivate{
  constructor(private userService: UserService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.userService.getIsAuthenticated();
    if(!isAuthenticated) {
      this.router.navigate(['/bejelentkezes']);
    }
    return isAuthenticated;
  }

}
