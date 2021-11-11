import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-uj-bejegyzes',
  templateUrl: './uj-bejegyzes.component.html',
  styleUrls: ['./uj-bejegyzes.component.css']
})
export class UjBejegyzesComponent{
  selectedOption : string = 'hir';

  onSubmit(form: NgForm) {
    console.log(this.selectedOption);
    console.log(form.value);
  }
}
