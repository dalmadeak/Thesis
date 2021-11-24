import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/bejelentkezes/user.service';

@Component({
  selector: 'app-uj-bejegyzes',
  templateUrl: './uj-bejegyzes.component.html',
  styleUrls: ['./uj-bejegyzes.component.css']
})
export class UjBejegyzesComponent implements OnInit{
  selectedOption : string | undefined = 'hirek';
  private userData: any;
  private authLevel: number = 5;

  constructor( private router: Router, private userService : UserService){
  }

  ngOnInit(){
    this.userData = this.userService.getUserInformation();
    this.authLevel = this.userService.getUserAuthorizationLevel(this.userData);
    if ((this.router.url).includes('szerkesztes')) {
      let arrayOfUrl = (this.router.url).split('/');
      let option = (arrayOfUrl[(arrayOfUrl.length - 2)]);
      this.selectedOption = option;
    }
  }

  getAuthLevel() {
    return this.authLevel;
  }
}
