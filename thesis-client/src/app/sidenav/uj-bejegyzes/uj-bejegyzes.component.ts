import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Hirek } from '../../hirek/hirek.model';

@Component({
  selector: 'app-uj-bejegyzes',
  templateUrl: './uj-bejegyzes.component.html',
  styleUrls: ['./uj-bejegyzes.component.css']
})
export class UjBejegyzesComponent{
  selectedOption : string = 'hir';

  constructor(private http: HttpClient) {
  }

  onSubmit(form: NgForm) {
    console.log(this.selectedOption);
    this.addNewPost(form);
  }

  addNewPost(form : NgForm) {
    const newPost : Hirek = {
      id: 1000,
      title: form.value.newRegistryGroup.title,
      content: form.value.newRegistryGroup.content,
      date: form.value.newRegistryGroup.postDate
    }

    this.http.post<{ message: string }>('http://localhost:3000/api/hirek', newPost).subscribe((responseData) => {
      console.log(responseData.message);
    });

    console.log(newPost);
  }
}
