import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-uj-bejegyzes',
  templateUrl: './uj-bejegyzes.component.html',
  styleUrls: ['./uj-bejegyzes.component.css']
})
export class UjBejegyzesComponent implements OnInit{
  selectedOption : string | undefined = 'hirek';

  constructor(private cd : ChangeDetectorRef, private router: Router){
  }

  ngOnInit(){
    if ((this.router.url).includes('szerkesztes')) {
      let arrayOfUrl = (this.router.url).split('/');
      let option = (arrayOfUrl[(arrayOfUrl.length - 2)]);
      this.selectedOption = option;
    }
  }


  //A change detection az Expression has changed after it was checked error miatt van https://angular.io/errors/NG0100
  refreshSelectedOption(option : any){
    this.selectedOption = option;
    //this.cd.detectChanges();
  }
}
