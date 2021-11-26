import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedOption : string | undefined = 'elnokseg';

  constructor(private cd : ChangeDetectorRef, private router: Router){}

  ngOnInit(){
    if ((this.router.url).includes('szerkesztes')) {
      let arrayOfUrl = (this.router.url).split('/');
      let option = (arrayOfUrl[(arrayOfUrl.length - 2)]);
      this.selectedOption = option;
    }
  }

}
