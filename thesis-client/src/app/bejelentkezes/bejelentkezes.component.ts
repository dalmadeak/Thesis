import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    console.log(form.value)
  }

}
