import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../bejelentkezes/user.service";

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
