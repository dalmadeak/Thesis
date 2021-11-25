import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent implements OnInit {
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    this.userService.login(form);
    setTimeout(() => {this.router.navigate(['/'])}, 1000);
  }
}
