import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-szolgaltatasok-sorompo',
  templateUrl: './szolgaltatasok-sorompo.component.html',
  styleUrls: ['./szolgaltatasok-sorompo.component.css', '../szolgaltatasok.component.css']
})
export class SzolgaltatasokSorompoComponent {
  nameControl = new FormControl('');

  onSubmit(form: NgForm) {
    console.log(form.value);
    alert('Sikeres jelentkezés!');
    form.reset();
  }
}
