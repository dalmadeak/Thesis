import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-uj-bejegyzes',
  templateUrl: './uj-bejegyzes.component.html',
  styleUrls: ['./uj-bejegyzes.component.css']
})
export class UjBejegyzesComponent implements OnInit{
  selectedOption : string = 'ules';

  constructor(private cd : ChangeDetectorRef){}

  ngOnInit(){}


  //A change detection az Expression has changed after it was checked error miatt van https://angular.io/errors/NG0100
  refreshSelectedOption(option : string){
    this.selectedOption = option;
    //this.cd.detectChanges();
  }
}
