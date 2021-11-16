import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedOption : string = 'elnokseg';

  constructor(private cd : ChangeDetectorRef){}

  ngOnInit(){}

}
