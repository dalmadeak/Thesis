import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  onSubmitProfile(form: NgForm) {
    console.log(form.value);
    alert('Sikeres adatmódosítás!');
    form.reset();
  }

  onSubmitPassword(form: NgForm) {
    console.log(form.value);
    alert('Sikeres jelszómódosítás!');
    form.reset();
  }

}
