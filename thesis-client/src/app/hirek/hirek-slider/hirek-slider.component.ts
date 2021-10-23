import { Component } from '@angular/core';

@Component({
  selector: 'app-hirek-slider',
  templateUrl: './hirek-slider.component.html',
  styleUrls: ['./hirek-slider.component.css']
})
export class HirekSliderComponent {
  imageObject: Array<object> = [{
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Jelentkezz te is a 2021-es IK GT szervezői közé!'
  }, {
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Csúnyák a HÖK-ösök!'
  }, {
      image: '../../../assets/images/header-background.png',
      thumbImage: '../../assets/images/header-background.png',
      title: 'Gyere ELTE is!'
  }];
}
