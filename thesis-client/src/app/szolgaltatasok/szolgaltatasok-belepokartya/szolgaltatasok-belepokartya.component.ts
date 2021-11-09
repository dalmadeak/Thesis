import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-szolgaltatasok-belepokartya',
  templateUrl: './szolgaltatasok-belepokartya.component.html',
  styleUrls: ['./szolgaltatasok-belepokartya.component.css']
})
export class SzolgaltatasokBelepokartyaComponent {
  studentIdAnswer = '';

  onSubmit(form: NgForm) {
    console.log(form.value);
    alert('Sikeres jelentkezés!');
    form.reset();
  }
}
